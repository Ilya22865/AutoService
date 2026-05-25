using AutoService.Models.Catalog;
using AutoService.Models.Users;

namespace AutoService.Models.Order
{
    public class OrderService
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int ServiceId { get; set; }
        public Service? Service { get; set; }
        public int? EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public int Quantity { get; set; }
        public decimal PriceAtSale { get; set; }
    }
}