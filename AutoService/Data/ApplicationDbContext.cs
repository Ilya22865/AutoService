using Microsoft.EntityFrameworkCore;
using AutoService.Models.Users;
using AutoService.Models.Order;
using AutoService.Models.Catalog;

namespace AutoService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        { 
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<OrderService> OrderServices { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Detail> Details { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<DetailCategory> DetailCategories { get; set; }
        public DbSet<ServiceCategory> ServiceCategories { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}
