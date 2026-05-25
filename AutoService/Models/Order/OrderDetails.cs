using AutoService.Models.Catalog;

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
        public decimal PriceAtSale { get; set; }
    }
}