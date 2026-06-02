using Microsoft.AspNetCore.Mvc;

namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly ILogger<ReviewController> _logger;
        public ReviewController(ILogger<ReviewController> logger)
        {
            _logger = logger;
        }
        
    }
}