using AutoService.DTOs.Auth;
using AutoService.Services.Clients;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace AutoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly ILogger<ClientController> _logger;
        private readonly IClientViewService _clientService;

        public ClientController(ILogger<ClientController> logger, IClientViewService clientService)
        {
            _logger = logger;
            _clientService = clientService;
        }

        [Authorize]
        [HttpGet("getClients")]
        public async Task<IActionResult> GetClients()
        {
            try
            {
                var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                var userId = int.Parse(userClaim!.Value);
                var role = User.FindFirst(ClaimTypes.Role)?.Value;
                if (role == null) throw new UnauthorizedAccessException("Роль не определена.");

                var clients = await _clientService.GetClientsAsync();
                return Ok(clients);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, "Ошибка при получении списка клиентов.");
                return Unauthorized(ex.Message);
            }
        }
    }
}
