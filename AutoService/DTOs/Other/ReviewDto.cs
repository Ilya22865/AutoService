using AutoService.DTOs.Order;

namespace AutoService.DTOs.Other
{
    public class ReviewDto
    {
        public int ClientId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = null!;
        public string ClientName { get; set; } = null!;
        public DateOnly Date { get; set; }
        public string VehicleModel { get; set; } = null!;
    }
}