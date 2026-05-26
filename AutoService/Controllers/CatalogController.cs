using AutoService.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CatalogController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("services")]
        public async Task<IActionResult> GetServices()
        {
            var services = await _context.Services
                .Include(s => s.Category)
                .Select(s => new { s.Id, s.Name, s.Description, s.Price, Category = s.Category != null ? s.Category.Name : null })
                .ToListAsync();
            return Ok(services);
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetDetails()
        {
            var details = await _context.Details
                .Include(d => d.Category)
                .Select(d => new { d.Id, d.Name, d.Description, d.Price, Category = d.Category != null ? d.Category.Name : null })
                .ToListAsync();
            return Ok(details);
        }
    }
}
