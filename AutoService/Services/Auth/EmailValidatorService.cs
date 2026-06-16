using System.Text.Json;
using Resend;

namespace AutoService.Services.Auth
{
    public class EmailValidatorService : IEmailValidator
    {
        private static readonly HttpClient _httpClient = new();
        private readonly IResend _resend;

        public EmailValidatorService(IResend resend)
        {
            _resend = resend;
        }

        public async Task<bool> IsValidAsync(string email, string apiKey)
        {
            try
            {
                var url = $"https://api.hunter.io/v2/email-verifier?email={Uri.EscapeDataString(email)}&api_key={apiKey}";
                using var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                    return false;

                using var jsonDoc = JsonDocument.Parse(await response.Content.ReadAsStreamAsync());
                var root = jsonDoc.RootElement;

                if (root.TryGetProperty("data", out var dataElement) && dataElement.TryGetProperty("status", out var statusElement))
                    return statusElement.GetString() == "valid";

                return false;
            } catch { return false; }
        }

        public async Task SendValidationEmailAsync(string to, string subject, string htmlBody)
        {
            try
            {
                var message = new EmailMessage
                {
                    From = "PitStopService <onboarding@resend.dev>",
                    To = to,
                    Subject = subject,
                    HtmlBody = htmlBody
                };

                await _resend.EmailSendAsync(message);
            }
            catch { }
        }
        
    }
}
