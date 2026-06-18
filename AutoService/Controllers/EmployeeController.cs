using AutoService.Data;
using AutoService.DTOs.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Employee")]
        [HttpGet("list")]
        public async Task<IActionResult> List()
        {
            var employees = await _context.Employees
                .Include(e => e.User)
                .Select(e => new EmployeeDto
                {
                    Id = e.Id,
                    FullName = e.User!.FullName,
                    Position = e.Position
                })
                .ToListAsync();

            return Ok(employees);
        }
    }
}
