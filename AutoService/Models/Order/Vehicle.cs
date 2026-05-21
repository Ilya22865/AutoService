using AutoService.Models.Users;

namespace AutoService.Models.Order
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string? VinNumber { get; set; }
        public string? Model { get; set; }
        public int Year { get; set; }
        public int OwnerId { get; set; }
        public Client? Owner { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}