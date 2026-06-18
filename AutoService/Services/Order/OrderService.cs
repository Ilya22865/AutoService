using AutoService.Data;
using AutoService.DTOs.Auth;
using AutoService.DTOs.Order;
using AutoService.Models.Catalog;
using AutoService.Models.Order;
using AutoService.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace AutoService.Services.OrderServices
{
    public class OrderViewService : IOrderViewService
    {
        private readonly ApplicationDbContext _context;

        public OrderViewService(ApplicationDbContext context)
        {
            _context = context;
        }
        private static ClientDto MapClient(Client client) => new()
        {
            FullName = client.User?.FullName ?? "",
            Email = client.User?.Email ?? "",
            Address = client.Address ?? "",
            PhoneNumber = client.PhoneNumber ?? "",
            Vehicles = client.Vehicles?.Select(MapVehicle).ToList() ?? [],
        };

        private static VehicleDto MapVehicle(Vehicle vehicle) => new()
        {
            Model = vehicle.Model ?? "",
            Year = vehicle.Year,
            VinNumber = vehicle.VinNumber ?? "",
            RegistrationNumber = vehicle.RegistrationNumber ?? "",
        };

        private static OrderServicesDto MapOrderService(OrderService orderService) => new()
        {
            ServiceName = orderService.Service?.Name ?? "",
            PriceAtSale = orderService.PriceAtSale,
            Quantity = orderService.Quantity,
            ServiceDescription = orderService.Service?.Description ?? "",
        };

        private static OrderDetailsDto MapOrderDetails(OrderDetails orderDetails) => new()
        {
            DetailName = orderDetails.Detail?.Name ?? "",
            Quantity = orderDetails.Quantity,
            PriceAtSale = orderDetails.PriceAtSale,
            DetailDescription = orderDetails.Detail?.Description ?? "",
        };

        private static OrderDto MapToDto(Order order) => new()
        {
            OrderId = order.Id,
            Status = order.Status,
            Client = order.Client is not null ? MapClient(order.Client) : null,
            Vehicle = order.Vehicle is not null ? MapVehicle(order.Vehicle) : null,
            Comment = order.Comment,
            ScheduledDate = order.ScheduledDate,
            AssignedEmployeeId = order.AssignedEmployeeId,
            AssignedEmployeeName = order.AssignedEmployee?.User?.FullName,
            Services = order.OrderServices?.Select(MapOrderService).ToList() ?? [],
            Details = order.OrderDetails?.Select(MapOrderDetails).ToList() ?? [],
        };

        public async Task<OrderDto?> GetOrdersByIdAsync(int orderId) {
            var order = await _context.Orders
                .Include(o => o.Client!).ThenInclude(c => c.User!)
                .Include(o => o.Client!).ThenInclude(c => c.Vehicles!)
                .Include(o => o.Vehicle)
                .Include(o => o.AssignedEmployee!).ThenInclude(e => e.User!)
                .Include(o => o.OrderServices!).ThenInclude((OrderService os) => os.Service!)
                .Include(o => o.OrderDetails!).ThenInclude((OrderDetails od) => od.Detail)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            return order is null ? null : MapToDto(order);
        }
        public async Task<IEnumerable<OrderDto>> GetOrdersAsync(int? userId = null)
        {
            IQueryable<Order> query = _context.Orders
                .Include(o => o.Client!).ThenInclude(c => c.User!)
                .Include(o => o.Client!).ThenInclude(c => c.Vehicles!)
                .Include(o => o.Vehicle)
                .Include(o => o.AssignedEmployee!).ThenInclude(e => e.User!)
                .Include(o => o.OrderServices!).ThenInclude((OrderService os) => os.Service!)
                .Include(o => o.OrderDetails!).ThenInclude((OrderDetails od) => od.Detail);

            if(userId.HasValue)
            {
                query = query.Where(o => o.Client != null && o.Client.UserId == userId.Value);
            }

            var orders = await query.ToListAsync();
            return orders.Select(MapToDto);
        }

        public async Task<bool> UpdateOrderAsync(int orderId, string? status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if(order == null) return false;

            if(!string.IsNullOrEmpty(status) && Enum.TryParse<OrderStatus>(status, out var newStatus))
            {
                order.Status = newStatus;
            }
            
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CancelOrderAsync(int orderId, int userId)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId && o.Client != null && o.Client.UserId == userId);
            if(order == null) return false;

                order.Status = OrderStatus.Cancelled;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<TimeSlotDto>> GetAvailableSlotsAsync(DateTime date)
        {
            var start = date.Date.AddHours(9);
            var end = date.Date.AddHours(21);
            var slotDuration = TimeSpan.FromHours(3);

            var allScheduled = await _context.Orders
                .Where(o => o.ScheduledDate >= start && o.ScheduledDate < end)
                .Select(o => o.ScheduledDate!.Value)
                .ToListAsync();

            var slots = new List<TimeSlotDto>();
            for (var slotStart = start; slotStart < end; slotStart = slotStart.Add(slotDuration))
            {
                var slotEnd = slotStart.Add(slotDuration);
                var isAvailable = !allScheduled.Any(s =>
                    s >= slotStart && s < slotEnd);

                slots.Add(new TimeSlotDto
                {
                    Time = $"{slotStart:HH:mm}–{slotEnd:HH:mm}",
                    Available = isAvailable
                });
            }
            return slots;
        }

        public async Task<bool> AssignEmployeeAsync(int orderId, int employeeId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return false;

            var employee = await _context.Employees.FindAsync(employeeId);
            if (employee == null) return false;

            order.AssignedEmployeeId = employeeId;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ScheduleOrderAsync(int orderId, DateTime scheduledDate)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return false;

            order.ScheduledDate = scheduledDate;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}