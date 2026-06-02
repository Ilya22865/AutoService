using AutoService.DTOs.Order;

namespace AutoService.DTOs.Other
{
    public class ReviewDto
    {
        public int Rating { get; set; }
        public string Comment { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public VehicleDto? Vehicle { get; set; }
    }
}