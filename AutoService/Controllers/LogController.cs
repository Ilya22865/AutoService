using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LogController : ControllerBase
{
    [Authorize(Roles = "Employee")]
    [HttpGet("download")]
    public IActionResult Download()
    {
        var dir = Path.Combine(Directory.GetCurrentDirectory(), "logs");
        if (!Directory.Exists(dir))
            return NotFound("Логи отсутствуют.");

        var files = Directory.GetFiles(dir).OrderByDescending(f => f).ToList();
        if (files.Count == 0)
            return NotFound("Логи отсутствуют.");

        var file = files.First();
        var bytes = System.IO.File.ReadAllBytes(file);
        return File(bytes, "text/plain", "logs.txt");
    }
}
