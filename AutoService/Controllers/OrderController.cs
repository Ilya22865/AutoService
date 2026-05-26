using System.Security.Claims;
using AutoService.DTOs.Order;
using AutoService.Models.Catalog;
using AutoService.Models.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoService.Data;
using AutoService.DTOs.DetailsAndServicesDto;
namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public OrderController(ApplicationDbContext context, IConfiguration configuration, ILogger<OrderController> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        [Authorize]
        [HttpPost("addOrder")]
        public async Task<IActionResult> AddOrder([FromBody] OrderDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();

            var client = await _context.Clients
                .FirstOrDefaultAsync(c => c.UserId == int.Parse(userIdClaim));

            if (client == null)
                return BadRequest("Клиент не найден");

            Vehicle? vehicle = null;
            if (dto.Vehicle != null && !string.IsNullOrEmpty(dto.Vehicle.VinNumber))
            {
                vehicle = await _context.Vehicles
                    .FirstOrDefaultAsync(v => v.VinNumber == dto.Vehicle.VinNumber);

                if (vehicle == null)
                {
                    vehicle = new Vehicle
                    {
                        Model = dto.Vehicle.Model,
                        Year = dto.Vehicle.Year,
                        VinNumber = dto.Vehicle.VinNumber,
                        RegistrationNumber = dto.Vehicle.RegistrationNumber,
                        OwnerId = client.Id
                    };
                    _context.Vehicles.Add(vehicle);
                    await _context.SaveChangesAsync();
                }
            }

            var order = new Order
            {
                Status = OrderStatus.Pending,
                ClientId = client.Id,
                VehicleId = vehicle?.Id,
                TotalAmount = (dto.Services?.Sum(s => s.TotalPrice) ?? 0) +
                              (dto.Details?.Sum(d => d.TotalPrice) ?? 0),
                Comment = dto.Comment ?? null,
                CreatedAt = DateTime.Now
            };
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            if (dto.Services != null)
            {
                foreach (var s in dto.Services)
                {
                    var catalogService = await _context.Services
                        .FirstOrDefaultAsync(sv => sv.Name == s.ServiceName);

                    _context.OrderServices.Add(new OrderService
                    {
                        OrderId = order.Id,
                        ServiceId = catalogService?.Id ?? 0,
                        EmployeeId = null,
                        Quantity = s.Quantity,
                        PriceAtSale = s.PriceAtSale
                    });
                }
            }

            if (dto.Details != null)
            {
                foreach (var d in dto.Details)
                {
                    var catalogDetail = await _context.Details
                        .FirstOrDefaultAsync(det => det.Name == d.DetailName);

                    _context.OrderDetails.Add(new OrderDetails
                    {
                        OrderId = order.Id,
                        DetailId = catalogDetail?.Id ?? 0,
                        Quantity = d.Quantity,
                        PriceAtSale = (int)d.PriceAtSale
                    });
                }
            }

            await _context.SaveChangesAsync();

            _logger.LogInformation($"[{order.CreatedAt}] Пользователь ID[{userIdClaim}] создал заказ {order.Id} на сумму {order.TotalAmount} рублей.");

            return Ok(new
            {
                order.Id,
                Status = order.Status.ToString(),
                order.TotalAmount
            });
        }
    }
}