using GymApi.Context;
using GymApi.Dtos;
using GymApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly GymDbContext _context;

        public UsersController(GymDbContext context)
        {
            _context = context;
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
        public async Task<IActionResult> PutGymUser(string id, GymUser gymUser)
        {
            if (id != gymUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(gymUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GymUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
