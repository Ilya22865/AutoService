using AutoService.Models.Catalog;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoService.Models.Order
{
    public class OrderDetails
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int DetailId { get; set; }
        public Detail? Detail { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal PriceAtSale { get; set; }
    }
}