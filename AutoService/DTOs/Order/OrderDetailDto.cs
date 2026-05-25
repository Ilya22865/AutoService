namespace AutoService.DTOs.Order
{
    public class OrderDetailsDto
    {
        public string DetailName { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal PriceAtSale { get; set; }
        public decimal TotalPrice => Quantity * PriceAtSale;
        public string DetailDescription { get; set; } = null!;
    }
}