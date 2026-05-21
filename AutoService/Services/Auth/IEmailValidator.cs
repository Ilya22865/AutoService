namespace AutoService.Services.Auth
{
    public interface IEmailValidator
    {
        Task<bool> IsValidAsync(string email, string apiKey);
    }
}