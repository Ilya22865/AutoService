namespace AutoService.DTOs.Order
{
    public class OrderServicesDto
    {
        public string ServiceName { get; set; } = null!;
        public decimal PriceAtSale { get; set; }
        public decimal TotalPrice => Quantity * PriceAtSale;
        public int Quantity { get; set; }
        public string ServiceDescription { get; set; } = null!;
    }
}