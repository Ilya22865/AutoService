using AutoService.Data;
using AutoService.DTOs.Auth;
using AutoService.DTOs.Order;
using AutoService.Models.Order;
using AutoService.Models.Users;
using Microsoft.EntityFrameworkCore;
namespace AutoService.Services.Clients
{
    public class ClientViewService : IClientViewService
    {
        private readonly ApplicationDbContext _context;

        public ClientViewService(ApplicationDbContext context)
        {
            _context = context;
        }

        private static ClientDto MapClient(Client client) => new()
        {
            FullName = client.User?.FullName ?? "",
            Email = client.User?.Email ?? "",
            Address = client.Address ?? "",
            PhoneNumber = client.PhoneNumber ?? "",
            Vehicles = client.Vehicles?.Select(MapVehicle).ToList() ?? [],
        };
        
        private static VehicleDto MapVehicle(Vehicle vehicle) => new()
        {
            Model = vehicle.Model ?? "",
            Year = vehicle.Year,
            VinNumber = vehicle.VinNumber ?? "",
            RegistrationNumber = vehicle.RegistrationNumber ?? "",
        };
        public async Task<IEnumerable<ClientDto>> GetClientsAsync()
        {
            var clients = await _context.Clients
                .Include(c => c.User)
                .Include(c => c.Vehicles)
                .ToListAsync();

            return clients.Select(MapClient);
        }
    }
}
