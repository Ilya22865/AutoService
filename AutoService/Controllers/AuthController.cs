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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null || !VerifyPassword(dto.Password, user.PasswordHash))
            {
                return Unauthorized("Неверный логин или пароль!");
            }

            var token = await _tokenGeneratorService.GenerateTokenServiceAsync(user.Id, user.Email, user.FullName, user.Role);
            return Ok(new { token, user.Id, user.Email, user.FullName, role = user.Role.ToString() });
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
                        FullName = dto.FullName,
                        Email = dto.Email,
                        PasswordHash = HashPassword(dto.Password),
                        Role = UserRole.Employee
                    };
                    _context.Users.Add(employeeUs);
                    await _context.SaveChangesAsync();

                    var employee = new Employee
                    {
                        Salary = dto.Salary,
                        Position = dto.Position,
                        UserId = employeeUs.Id
                    };

                    _context.Employees.Add(employee);
                    await _context.SaveChangesAsync();

                    var employeeToken = await _tokenGeneratorService.GenerateTokenServiceAsync(employeeUs.Id, employeeUs.Email, employeeUs.FullName, UserRole.Employee);
                    return Ok(new { token = employeeToken, id = employeeUs.Id, fullName = employeeUs.FullName, salary = employee.Salary, position = employee.Position, role = "Employee" });
                }
                else
                {
                    return BadRequest(new { message = "Неверный код доступа!" });
                }
            }

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = HashPassword(dto.Password),
                Role = UserRole.Client
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var client = new Client
            {
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber,
                UserId = user.Id
            };

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            var token = await _tokenGeneratorService.GenerateTokenServiceAsync(user.Id, user.Email, user.FullName, UserRole.Client);
            return Ok(new { token, user.Id, user.Email, user.FullName, client.Address, client.PhoneNumber, role = "Client" });
        }

        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private static bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
