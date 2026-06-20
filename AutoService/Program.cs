using System.Text;
using AutoService.Data;
using AutoService.Logging;
using AutoService.Services.Auth;
using AutoService.Services.Clients;
using AutoService.Services.OrderServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Resend;
var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddFile("logs");
builder.Configuration.AddUserSecrets<Program>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddResend(options =>
{
    options.ApiToken = builder.Configuration["Resend:ApiKeys:Default"] ?? "";
});

builder.Services.AddScoped<IEmailValidator, EmailValidatorService>();
builder.Services.AddScoped<ITokenGenerator, TokenGeneratorService>();
builder.Services.AddScoped<IOrderViewService, OrderViewService>();
builder.Services.AddScoped<IClientViewService, ClientViewService>();
builder.Services.AddScoped<IReviewService, ReviewService>();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var KEY = jwtSettings["Key"];
var ISSUER = jwtSettings["Issuer"];
var AUDIENCE = jwtSettings["Audience"];

if (string.IsNullOrEmpty(KEY) || string.IsNullOrEmpty(ISSUER) || string.IsNullOrEmpty(AUDIENCE))
{
    throw new InvalidOperationException("JWT settings not configured. Check user-secrets.");
}

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter());
    });
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = ISSUER,
        ValidateAudience = true,
        ValidAudience = AUDIENCE,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY))
    };
});

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

var frontendPath = Path.Combine(Directory.GetCurrentDirectory(), "Frontend");
if (Directory.Exists(frontendPath))
{
    app.UseDefaultFiles(new DefaultFilesOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(frontendPath),
        RequestPath = ""
    });
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(frontendPath),
        RequestPath = ""
    });
}

app.MapControllers();
app.Run();
