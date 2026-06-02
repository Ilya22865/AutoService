using AutoService.DTOs.Auth;
using AutoService.DTOs.Other;

namespace AutoService.Services.Clients
{
    public interface IClientViewService
    {
        Task<IEnumerable<ClientDto>> GetClientsAsync();
        Task<ReviewDto> AddReviewAsync(ReviewDto reviewDto);
        Task<IEnumerable<ReviewDto>> GetReviewsAsync(int? vehicleId = null);
    }
}
