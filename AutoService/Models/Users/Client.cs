using AutoService.Models.Order;

namespace AutoService.Models.Users
{
    public class Client
    {
        public int Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public int? UserId { get; set; }
        public User? User { get; set; }
        public ICollection<Vehicle>? Vehicles { get; set; } = null!;
        public ICollection<AutoService.Models.Order.Order>? Orders { get; set; } = null!;
    }
}
