namespace AutoService.Services.Auth
{
    public interface IEmailValidator
    {
        Task<bool> IsValidAsync(string email, string apiKey);
        Task SendValidationEmailAsync(string to, string subject, string htmlBody);
    }
}