using AutoService.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : ControllerBase
    {
        private readonly ILogger<CatalogController> _logger;
        private readonly ApplicationDbContext _context;

        public CatalogController(ApplicationDbContext context, ILogger<CatalogController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("services")]
        public async Task<IActionResult> GetServices()
        {
            try {
                var services = await _context.Services
                    .Include(s => s.Category)
                    .Select(s => new { s.Id, s.Name, s.Description, s.Price, Category = s.Category != null ? s.Category.Name : null })
                   .ToListAsync();
                   _logger.LogInformation($"[{DateTime.Now}] Услуги загружены в систему.");
                   return Ok(services);
            }
            catch (Exception ex) {
                _logger.LogError($"[{DateTime.Now}] Ошибка при загрузке услуг: {ex.Message}");
                return StatusCode(500, "Ошибка при загрузке услуг.");
            }
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetDetails()
        {
            try {
                var details = await _context.Details
                    .Include(d => d.Category)
                    .Select(d => new { d.Id, d.Name, d.Description, d.Price, Category = d.Category != null ? d.Category.Name : null })
                    .ToListAsync();
                _logger.LogInformation($"[{DateTime.Now}] Детали загружены в систему.");
                return Ok(details);
            }
            catch (Exception ex) {
                _logger.LogError($"[{DateTime.Now}] Ошибка при загрузке деталей: {ex.Message}");
                return StatusCode(500, "Ошибка при загрузке деталей.");
            }
        }
    }
}
