using AutoService.Models.Order;

namespace AutoService.Models.Users
{
    public class Reviews
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public int Rating { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public int? VehicleId { get; set; }
        public Vehicle? Vehicle { get; set; }
        public DateOnly Date { get; set; }
    }
}