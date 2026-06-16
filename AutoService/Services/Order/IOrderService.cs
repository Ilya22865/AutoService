using AutoService.DTOs.Order;
namespace AutoService.Services.OrderServices
{
    public interface IOrderViewService
    {
        Task<OrderDto?> GetOrdersByIdAsync(int orderId);
        Task<IEnumerable<OrderDto>> GetOrdersAsync(int? userId = null);
        Task<bool> UpdateOrderAsync(int orderId, string? status);
        Task<bool> CancelOrderAsync(int orderId, int userId);
        Task<List<TimeSlotDto>> GetAvailableSlotsAsync(DateTime date);
        Task<bool> AssignEmployeeAsync(int orderId, int employeeId);
        Task<bool> ScheduleOrderAsync(int orderId, DateTime scheduledDate);
    }
}