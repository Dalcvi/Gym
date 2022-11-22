using GymApi.Context;
using GymApi.Dtos;
using GymApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Controllers
{
    [Route("api/gyms/{gymId}/trainers")]
    [ApiController]
    public class GymTrainersController : ControllerBase
    {
        private readonly GymDbContext _context;

        public GymTrainersController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/gyms/5/trainers
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetGymTrainers(int gymId)
        {
            var gymTrainers = await _context.GymTrainers.Where((g) => g.GymId == gymId).Include(g => g.User).ToListAsync();

            return Ok(gymTrainers.Select(g => g.User.MapToDto()));
        }

        // POST: api/gyms/5/trainers/2
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{userId}")]
        [AllowAnonymous]
        public async Task<ActionResult<GymTrainer>> PostGymTrainer(int gymId, string userId)
        {
            _context.GymTrainers.Add(new GymTrainer() { GymId = gymId, UserId = userId });
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/gyms/5/trainers/2
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteGymTrainer(int gymId, string userId)
        {
            var gymTrainer = await _context.GymTrainers.FirstOrDefaultAsync((i) => i.UserId == userId && i.GymId == gymId);
            if (gymTrainer == null)
            {
                return NotFound();
            }

            _context.GymTrainers.Remove(gymTrainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
