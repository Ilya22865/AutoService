using AutoService.Models.Order;

namespace AutoService.Models.Users
{
    public class Employee
    {
        public int Id { get; set; }
        public decimal Salary { get; set; }
        public string Position { get; set; } = null!;
        public int? UserId { get; set; }
        public User? User { get; set; }
        public ICollection<OrderService>? OrderServices { get; set; } = null!;
    }
}
