namespace AutoService.Models.Users
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public UserRole Role { get; set; }
        public Client? Client { get; set; }
        public Employee? Employee { get; set; }
    }

    public enum UserRole
    {
        Employee,
        Client
    }
}
