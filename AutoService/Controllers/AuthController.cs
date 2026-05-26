using System.Security.Claims;
using AutoService.DTOs.Auth;
using AutoService.Data;
using AutoService.Models.Users;
using AutoService.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailValidator _emailValidatorService;
        private readonly ITokenGenerator _tokenGeneratorService;

        public AuthController(ApplicationDbContext context, IConfiguration configuration, IEmailValidator emailValidatorService, ITokenGenerator tokenGeneratorService, ILogger<AuthController> logger)
        {
            _context = context;
            _configuration = configuration;
            _emailValidatorService = emailValidatorService;
            _tokenGeneratorService = tokenGeneratorService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
                if (user == null || !VerifyPassword(dto.Password, user.PasswordHash))
                {
                    throw new Exception("Неверный логин или пароль!");
                }

                _logger.LogInformation($"[{DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss")}] Пользователь [Id: {user.Id}] успешно вошел в систему.");
                var token = await _tokenGeneratorService.GenerateTokenServiceAsync(user.Id, user.Email, user.FullName, user.Role);
                return Ok(new { token, user.Id, user.Email, user.FullName, role = user.Role.ToString() });
            }
            catch (Exception ex)
            {
                _logger.LogError($"[{DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss")}] Ошибка при входе в систему: {ex.Message}");
                return Unauthorized(ex.Message);
            }
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
                try
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
                            Position = dto.Position ?? "",
                            UserId = employeeUs.Id
                        };

                        _context.Employees.Add(employee);
                        await _context.SaveChangesAsync();

                        _logger.LogInformation($"[{DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss")}] Пользователь {employeeUs.FullName} успешно зарегистрирован как сотрудник.");
                        var employeeToken = await _tokenGeneratorService.GenerateTokenServiceAsync(employeeUs.Id, employeeUs.Email, employeeUs.FullName, UserRole.Employee);
                        return Ok(new { token = employeeToken, id = employeeUs.Id, fullName = employeeUs.FullName, salary = employee.Salary, position = employee.Position, role = "Employee" });
                    }
                    else
                    {
                        throw new Exception("Неверный код доступа!");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"[{DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss")}] Сотрудник {dto.FullName} ввел неверный код доступа или кто-то попытался получить доступ: {ex.Message}");
                    return BadRequest(ex.Message);
                }
            }

            try
            {
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

                _logger.LogInformation($"[{DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss")}] Пользователь [Id: {user.Id}] успешно зарегистрирован как клиент.");
                var token = await _tokenGeneratorService.GenerateTokenServiceAsync(user.Id, user.Email, user.FullName, UserRole.Client);
                return Ok(new { token, user.Id, user.Email, user.FullName, client.Address, client.PhoneNumber, role = "Client" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[{DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss")}] Ошибка при регистрации пользователя: {dto.FullName}.");
                return StatusCode(500, "Ошибка при регистрации пользователя.");
            }
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
