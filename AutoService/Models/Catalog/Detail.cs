using System.ComponentModel.DataAnnotations.Schema;
using AutoService.Models.Order;

namespace AutoService.Models.Catalog
{
    public class Detail
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public int? CategoryId { get; set; }
        public DetailCategory? Category { get; set; }
        public ICollection<OrderDetails>? OrderDetails { get; set; } = null!;
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
    }
}
