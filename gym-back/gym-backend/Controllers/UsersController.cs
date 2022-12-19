using GymApi.Context;
using GymApi.Dtos;
using GymApi.Models;
using GymApi.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace GymApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly GymDbContext _context;
        private readonly IAuthorizationService authService;
        private readonly UserManager<GymUser> _userManager;


        public UsersController(GymDbContext context, UserManager<GymUser> userManager, IAuthorizationService authorizationService)
        {
            _context = context;
            authService = authorizationService;
            _userManager = userManager;
        }

        // GET: api/Users
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetGymUsers()
        {
            var users = await _context.Users.ToListAsync();

            return Ok(users.Select(user => user.MapToDto()));
        }

        // GET: api/Users/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetGymUser(string id)
        {
            var gymUser = await _context.GymUsers.FindAsync(id);

            if (gymUser == null)
            {
                return NotFound();
            }

            return Ok(gymUser.MapToDto());
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGymUser(string id, UpdateUserDto gymUser)
        {
            ClaimsPrincipal currentUser = this.User;
            if(currentUser == null)
            {
                return BadRequest("Bad token");
            }
            var userEmail = currentUser.FindFirst(ClaimTypes.Email).Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return BadRequest("Bad token");
            }

            if (user.Id != id)
            {
                return Forbid();
            }

            user.FirstName = gymUser.FirstName;
            user.LastName = gymUser.LastName;
            user.Age = gymUser.Age;
            user.AvatarUrl = gymUser.AvatarUrl;
            if(gymUser.PlanId != null && user.PlanId != gymUser.PlanId)
            {
                var plan = await _context.Plans.FindAsync(gymUser.PlanId);
                if (plan != null)
                {
                    user.Plan = plan;
                    DateTime now = new DateTime();
                    DateTime yearLater = now.AddYears(1);
                    user.PlanEnd = yearLater;
                }
            }

            _context.GymUsers.Update(user);
            await _context.SaveChangesAsync();
            return Ok(user.MapToDto());
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGymUser(string id)
        {
            var gymUser = await _context.GymUsers.FindAsync(id);
            if (gymUser == null)
            {
                return NotFound();
            }

            _context.GymUsers.Remove(gymUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GymUserExists(string id)
        {
            return _context.GymUsers.Any(e => e.Id == id);
        }
    }
}
