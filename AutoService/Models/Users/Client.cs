using AutoService.Models.Order;

namespace AutoService.Models.Users
{
    public class Client
    {
        public int Id { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public ICollection<Vehicle>? Vehicles { get; set; } = null!;
        public ICollection<AutoService.Models.Order.Order>? Orders { get; set; } = null!;
    }
}
