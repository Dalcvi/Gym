using GymApi.Auth;
using Microsoft.AspNetCore.Identity;

namespace GymApi.Models
{
    public class AuthDbSeeder
    {
        private readonly UserManager<GymUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthDbSeeder(UserManager<GymUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            await AddDefaultRoles();
            await AddAdminUser();
        }

        private async Task AddAdminUser()
        {
            var newAdminUser = new GymUser()
            {
                Email = "admin@admin.com",
                UserName = "admin@admin.com",
                FirstName = "Admin",
                LastName = "Admin"
            };
            var existingAdminUser = await _userManager.FindByEmailAsync(newAdminUser.Email);

            if (existingAdminUser != null)
            {
                return;
            }

            var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "!TheFirstAdminPassword1");

            if (createAdminUserResult.Succeeded)
            {
                await _userManager.AddToRolesAsync(newAdminUser, Roles.List);
            }
        }

        private async Task AddDefaultRoles()
        {
            foreach (var role in Roles.List)
            {
                bool roleExists = await _roleManager.RoleExistsAsync(role);
                if (roleExists == false)
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }
    }
}
