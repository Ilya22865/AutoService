namespace AutoService.DTOs.Order
{
    public class VehicleDto
    {
        public string Model { get; set; } = null!;
        public int Year { get; set; }
        public string VinNumber { get; set; } = null!;
        public string RegistrationNumber { get; set; } = null!;
    }
}