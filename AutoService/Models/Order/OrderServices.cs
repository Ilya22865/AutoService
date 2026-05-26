using AutoService.Models.Catalog;
using AutoService.Models.Users;
using System.ComponentModel.DataAnnotations.Schema;

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
        [Column(TypeName = "decimal(10,2)")]
        public decimal PriceAtSale { get; set; }
    }
}