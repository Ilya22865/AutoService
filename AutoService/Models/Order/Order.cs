using AutoService.Models.Users;

namespace AutoService.Models.Order
{
    public enum OrderStatus
    {
        Pending,
        Completed,
        Cancelled
    }

    public class Order
    {
        public int Id { get; set; }
        public OrderStatus? Status { get; set; }
        public int? ClientId { get; set; }
        public string? Comment { get; set; }
        public DateTime? CreatedAt { get; set; }
        public Client? Client { get; set; }
        public decimal TotalAmount { get; set; }
        public int? VehicleId { get; set; }
        public Vehicle? Vehicle { get; set; }
        public ICollection<OrderService>? OrderServices { get; set; }
        public ICollection<OrderDetails>? OrderDetails { get; set; }
    }
}