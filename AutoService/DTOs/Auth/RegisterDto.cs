namespace AutoService.DTOs.Auth
{
    public class RegisterDto
    {
        public string FullName { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string Email { get; set; } = null!;
        public string? Address { get; set; }
        public string Password { get; set; } = null!;
        public string EmployeeCode { get; set; }
        public string? Position { get; set; }
        public decimal Salary { get; set; }
    }
}
