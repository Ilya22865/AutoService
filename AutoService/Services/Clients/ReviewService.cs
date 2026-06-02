using AutoService.Data;
using AutoService.Models.Users;
using Microsoft.EntityFrameworkCore;
using AutoService.DTOs.Other;
namespace AutoService.Services.Clients
{
    public class ReviewService : IReviewService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ReviewService> _logger;

        public ReviewService(ApplicationDbContext context, ILogger<ReviewService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public static ReviewDto MapReview(Review review) => new()
        {
            Rating = review.Rating,
            Comment = review.Text ?? "",
            ClientName = review.Client?.User?.FullName ?? "",
            Date = review.Date,
            VehicleModel = review.Vehicle?.Model ?? "",
        };
        
        public async Task<ReviewDto> AddReviewAsync(int clientId, ReviewDto reviewDto)
        {
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.OwnerId == clientId && v.Model == reviewDto.VehicleModel);
            var review = new Review
            {
                Rating = reviewDto.Rating,
                Text = reviewDto.Comment,
                ClientId = clientId,
                VehicleId = vehicle?.Id,
                Date = DateOnly.FromDateTime(DateTime.UtcNow),
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return MapReview(review);
        }

        public async Task<IEnumerable<ReviewDto>> GetReviewsAsync(int? vehicleId = null)
        {
            var reviews = await _context.Reviews
                .Include(r => r.Client).ThenInclude(c => c.User)
                .Include(r => r.Vehicle)
                .Where(r => vehicleId == null || r.VehicleId == vehicleId)
                .ToListAsync();

            return reviews.Select(MapReview);
        }
    }
}
