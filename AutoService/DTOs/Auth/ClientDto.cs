using AutoService.DTOs.Order;

namespace AutoService.DTOs.Auth
{
    public class ClientDto
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public List<VehicleDto> Vehicles { get; set; } = new List<VehicleDto>();
        public string Address { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
    }
}