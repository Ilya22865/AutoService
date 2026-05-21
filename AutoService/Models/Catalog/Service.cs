using AutoService.Models.Order;

namespace AutoService.Models.Catalog
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public int? CategoryId { get; set; }
        public ServiceCategory? Category { get; set; }
        public ICollection<OrderService>? OrderServices { get; set; } = null!;
    }
}