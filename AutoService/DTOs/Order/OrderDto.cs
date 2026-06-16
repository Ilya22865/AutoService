using AutoService.DTOs.Auth;
using AutoService.Models.Order;

namespace AutoService.DTOs.Order
{
    public class OrderDto
    {
        public OrderStatus? Status { get; set; }
        public int OrderId { get; set; }
        public ClientDto? Client { get; set; }
        public VehicleDto? Vehicle { get; set; }
        public List<OrderServicesDto> Services { get; set; } = new List<OrderServicesDto>();
        public List<OrderDetailsDto> Details { get; set; } = new List<OrderDetailsDto>();
        public string? Comment { get; set; }
        public DateTime? ScheduledDate { get; set; }
        public int? AssignedEmployeeId { get; set; }
        public string? AssignedEmployeeName { get; set; }
    }
}