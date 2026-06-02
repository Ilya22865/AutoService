using AutoService.DTOs.Auth;
namespace AutoService.Services.Clients
{
    public interface IClientViewService
    {
        Task<IEnumerable<ClientDto>> GetClientsAsync();
       
    }
}
