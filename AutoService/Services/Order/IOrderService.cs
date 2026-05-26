using AutoService.DTOs.Order;
namespace AutoService.Services.OrderServices
{
    public interface IOrderViewService
    {
        Task<IEnumerable<OrderDto>> GetOrdersAsync(int? userId = null);
        Task<bool> UpdateOrderAsync(int orderId, string? status);
        Task<bool> CancelOrderAsync(int orderId, int userId);
    }
}