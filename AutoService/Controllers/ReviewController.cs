using System.Security.Claims;
using AutoService.Data;
using AutoService.DTOs.Other;
using AutoService.Services.Clients;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly ILogger<ReviewController> _logger;
        private readonly IReviewService _reviewService;
        private readonly ApplicationDbContext _context;
        public ReviewController(ILogger<ReviewController> logger, IReviewService reviewService, ApplicationDbContext context)
        {
            _logger = logger;
            _reviewService = reviewService;
            _context = context;
        }

        [Authorize]
        [HttpPost("addReview")]
        public async Task<IActionResult> AddReview([FromBody] ReviewDto reviewDto)
        {
            try
            {
                var role = User.FindFirst(ClaimTypes.Role)?.Value;
                if (role != "Client")
                {
                    throw new UnauthorizedAccessException("Оставлять отзывы могут только клиенты.");
                }
                var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                var client = await _context.Clients.FirstOrDefaultAsync(c => c.UserId == int.Parse(userClaim!.Value));
                var review = await _reviewService.AddReviewAsync(client!.Id, reviewDto);
                _logger.LogInformation($"Клиент с ID:[{client.Id}] написал отзыв: {reviewDto.Comment}");
                return Ok(review);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, "Ошибка: пользователь не авторизован, либо у него нет прав на выполнение этой операции.");
                return Unauthorized(ex.Message);
            }

        }

        [HttpGet("getReviews")]
        public async Task<IActionResult> GetReviews()
        {
            try {
                var reviews = await _reviewService.GetReviewsAsync();
                _logger.LogInformation($"Загружено {reviews.Count()} отзывов.");
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении отзывов.");
                return StatusCode(500, "Ошибка при получении отзывов.");
            }
        }
    }
}