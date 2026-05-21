using AutoService.Models.Users;

namespace AutoService.Services.Auth
{
    public interface ITokenGenerator
    {
        Task<string> GenerateTokenServiceAsync(int id, string email, string fullName, UserRole role);
    }
}