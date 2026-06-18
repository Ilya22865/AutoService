namespace AutoService.DTOs.Auth
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = null!;
        public string? Position { get; set; }
    }
}
