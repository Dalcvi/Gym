using GymApi.Context;
using GymApi.Models;
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
        public async Task<ActionResult<IEnumerable<GymTrainer>>> GetGymTrainers(int gymId)
        {
            return await _context.GymTrainers.Where((i) => i.GymId == gymId).ToListAsync();
        }

        // GET: api/gyms/5/trainers/2
        [HttpGet("{userId}")]
        public async Task<ActionResult<GymTrainer>> GetGymTrainer(int gymId, string userId)
        {
            var gymTrainer = await _context.GymTrainers.FirstOrDefaultAsync((i) => i.UserId == userId && i.GymId == gymId);

            if (gymTrainer == null)
            {
                return NotFound();
            }

            return gymTrainer;
        }

        // POST: api/gyms/5/trainers/2
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{userId}")]
        public async Task<ActionResult<GymTrainer>> PostGymTrainer(GymTrainer gymTrainer)
        {
            _context.GymTrainers.Add(gymTrainer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGymTrainer", new { id = gymTrainer.Id }, gymTrainer);
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

        private bool GymTrainerExists(int id)
        {
            return _context.GymTrainers.Any(e => e.Id == id);
        }
    }
}
