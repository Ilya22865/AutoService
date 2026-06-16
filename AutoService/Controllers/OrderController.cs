using System.Security.Claims;
using AutoService.Data;
using AutoService.DTOs.Order;
using AutoService.Models.Catalog;
using AutoService.Models.Order;
using AutoService.Services.OrderServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoService.Services.Auth;
namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IOrderViewService _orderService;
        private readonly IEmailValidator _emailValidator;

        public OrderController(ApplicationDbContext context, ILogger<OrderController> logger, IOrderViewService orderService, IEmailValidator emailValidator)
        {
            _context = context;
            _logger = logger;
            _orderService = orderService;
            _emailValidator = emailValidator;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id) {
            var dto = await _orderService.GetOrdersByIdAsync(id);
            if (dto is null) return NotFound(new { message = "Заказ не найден" });
            return Ok(dto);
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
                ScheduledDate = dto.ScheduledDate,
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

            var userEmail = await _context.Users
                .Where(u => u.Id == int.Parse(userIdClaim))
                .Select(u => u.Email)
                .FirstOrDefaultAsync();

            if (!string.IsNullOrEmpty(userEmail))
            {
                var servicesList = string.Join("", (dto.Services ?? new List<OrderServicesDto>())
                    .Select(s => $"<tr><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#333;'>{s.ServiceName}</td><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#333;text-align:center;'>{s.Quantity}</td><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#333;text-align:right;'>{s.TotalPrice} Br</td></tr>"));

                var detailsList = string.Join("", (dto.Details ?? new List<OrderDetailsDto>())
                    .Select(d => $"<tr><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#333;'>{d.DetailName}</td><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#333;text-align:center;'>{d.Quantity}</td><td style='padding:8px 12px;border-bottom:1px solid #eee;color:#333;text-align:right;'>{d.TotalPrice} Br</td></tr>"));

                await _emailValidator.SendValidationEmailAsync(
                    userEmail,
                    $"Заказ №{order.Id} принят — AutoService",
                    $@"<div style='font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;'>
                        <h2 style='color:#d4332a;margin-bottom:16px;'>AutoService</h2>
                        <p style='color:#333;font-size:15px;line-height:1.6;'>Здравствуйте!<br><br>
                        Ваш заказ №<b>{order.Id}</b> принят и передан в работу.<br>
                        Наш менеджер свяжется с вами для уточнения деталей.</p>
                        <h3 style='color:#333;font-size:15px;border-bottom:2px solid #d4332a;padding-bottom:8px;'>Состав заказа</h3>
                        <table style='width:100%;border-collapse:collapse;margin:12px 0;'>
                            <thead>
                                <tr style='background:#f8f9fa;'>
                                    <th style='padding:8px 12px;text-align:left;color:#555;font-size:13px;'>Услуга</th>
                                    <th style='padding:8px 12px;color:#555;font-size:13px;'>Кол-во</th>
                                    <th style='padding:8px 12px;text-align:right;color:#555;font-size:13px;'>Цена</th>
                                </tr>
                            </thead>
                            <tbody>{servicesList}{detailsList}</tbody>
                        </table>
                        <p style='text-align:right;font-size:16px;font-weight:700;color:#333;margin-top:8px;'>Итого: {order.TotalAmount} Br</p>
                        <p style='color:#888;font-size:13px;margin-top:20px;border-top:1px solid #eee;padding-top:16px;'>
                        С уважением, команда AutoService<br>
                        г.Витебск, ул.Гагарина 41А | +375(29)976-51-13</p>
                      </div>");
            }

            return Ok(new
            {
                order.Id,
                Status = order.Status.ToString(),
                order.TotalAmount
            });
        }

        [Authorize]
        [HttpGet("getOrders")]
        public async Task<IActionResult> GetOrders()
        {
            try {
                var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                var userId = int.Parse(userClaim!.Value);
                var role = User.FindFirst(ClaimTypes.Role)?.Value;
                if (role == null) throw new UnauthorizedAccessException("Роль не определена.");

                IEnumerable<OrderDto> orders;

                if(role == "Employee") orders = await _orderService.GetOrdersAsync();
                else orders = await _orderService.GetOrdersAsync(userId);

                return Ok(orders);
            }
            catch (UnauthorizedAccessException ex) {
                _logger.LogError(ex, "Ошибка при получении заказов.");
                return Unauthorized(ex.Message);
            }
        }

        [Authorize(Roles = "Employee")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
        {
            var ok = await _orderService.UpdateOrderAsync(id, dto.Status);
            if (!ok) return NotFound(new { message = "Заказ не найден" });
            return Ok(new { message = "Статус обновлён" });
        }

        [Authorize(Roles = "Employee")]
        [HttpPut("{id}/assign")]
        public async Task<IActionResult> AssignEmployee(int id, [FromBody] AssignEmployeeDto dto)
        {
            var ok = await _orderService.AssignEmployeeAsync(id, dto.EmployeeId);
            if (!ok) return NotFound(new { message = "Заказ или сотрудник не найден" });
            return Ok(new { message = "Сотрудник назначен" });
        }

        [Authorize]
        [HttpPut("{id}/schedule")]
        public async Task<IActionResult> Schedule(int id, [FromBody] ScheduleDto dto)
        {
            var ok = await _orderService.ScheduleOrderAsync(id, dto.ScheduledDate);
            if (!ok) return NotFound(new { message = "Заказ не найден" });
            return Ok(new { message = "Время записи сохранено" });
        }

        [HttpGet("slots")]
        public async Task<IActionResult> GetSlots([FromQuery] DateTime date)
        {
            var slots = await _orderService.GetAvailableSlotsAsync(date);
            return Ok(slots);
        }
    }
}
