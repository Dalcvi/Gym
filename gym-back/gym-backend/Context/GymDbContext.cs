using GymApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Context
{
    public class GymDbContext : IdentityDbContext<GymUser>
    {
        public DbSet<Gym> Gyms { get; set; }
        public DbSet<GymTrainer> GymTrainers { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Benefit> Benefits { get; set; }
        public DbSet<PlanBenefit> PlanBenefits { get; set; }
        public DbSet<GymUser> GymUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .Build();

            optionsBuilder.UseMySql(configuration["ConnectionStrings:DatabaseConnectionString"], new MySqlServerVersion(new Version(1, 0, 0)));
        }
    }
}

