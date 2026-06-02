using AutoService.DTOs.Other;
namespace AutoService.Services.Clients
{
    public interface IReviewService
    {
        Task<ReviewDto> AddReviewAsync(int clientId, ReviewDto reviewDto);
        Task<IEnumerable<ReviewDto>> GetReviewsAsync(int? vehicleId = null);
    }
}