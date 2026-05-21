using AutoService.DTOs.Auth;
using AutoService.Data;
using AutoService.Models.Users;
using AutoService.Services.Auth;
using Microsoft.AspNetCore.Mvc;

namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailValidator _emailValidatorService;
        private readonly ITokenGenerator _tokenGeneratorService;

        public AuthController(ApplicationDbContext context, IConfiguration configuration, IEmailValidator emailValidatorService, ITokenGenerator tokenGeneratorService)
        {
            _context = context;
            _configuration = configuration;
            _emailValidatorService = emailValidatorService;
            _tokenGeneratorService = tokenGeneratorService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var config = _configuration.GetSection("Hunter");
            string? hunterApiKey = config["ApiKey"];
            var ADMIN_CODE = _configuration.GetSection("EmployeeCode")["Code"];

            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
            {
                return BadRequest("Все поля должны быть заполнены!");
            }

            if (_context.Users.Any(u => u.Email == dto.Email))
            {
                return BadRequest("Такой пользователь уже существует!");
            }

            bool isEmailValid = await _emailValidatorService.IsValidAsync(dto.Email, hunterApiKey ?? "");
            if (!isEmailValid)
            {
                return BadRequest("Такого email не существует!");
            }
            if (!string.IsNullOrEmpty(dto.EmployeeCode))
            {
                if (dto.EmployeeCode == ADMIN_CODE)
                {
                    var employeeUs = new User
                    {
                        Email = dto.Email,
                        PasswordHash = HashPassword(dto.Password),
                        Role = UserRole.Employee
                    };
                    _context.Users.Add(employeeUs);
                    await _context.SaveChangesAsync();

                    var employee = new Employee
                    {
                        FullName = dto.FullName,
                        Salary = dto.Salary,
                        Position = dto.Position,
                        UserId = employeeUs.Id
                    };

                    _context.Employees.Add(employee);
                    await _context.SaveChangesAsync();

                    var employeeToken = _tokenGeneratorService.GenerateTokenServiceAsync(employeeUs.Id, employeeUs.Email, employee.FullName, UserRole.Employee);
                    return Ok(new { Token = employeeToken, employeeUs.Id, employee.FullName, employee.Salary, employee.Position, role = "Employee" });
                }
                else
                {
                    return BadRequest(new { message = "Неверный код доступа!" });
                }
            }

            var user = new User
            {
                Email = dto.Email,
                PasswordHash = HashPassword(dto.Password),
                Role = UserRole.Client
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var client = new Client
            {
                FullName = dto.FullName,
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber,
                UserId = user.Id
            };

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            var token = await _tokenGeneratorService.GenerateTokenServiceAsync(user.Id, user.Email, client.FullName, UserRole.Client);
            return Ok(new { token, user.Id, user.Email, client.FullName, client.Address, client.PhoneNumber, role = "Client" });
        }

        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
