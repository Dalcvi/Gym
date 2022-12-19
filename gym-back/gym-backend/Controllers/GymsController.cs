using GymApi.Auth;
using GymApi.Context;
using GymApi.Dtos;
using GymApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Controllers
{
    [Route("api/gyms")]
    [AllowAnonymous]
    [ApiController]
    public class GymsController : ControllerBase
    {
        private readonly GymDbContext _context;

        public GymsController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/Gyms
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Gym>>> GetGyms()
        {
            return await _context.Gyms.ToListAsync();
        }

        // GET: api/Gyms/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Gym>> GetGym(int id)
        {
            var gym = await _context.Gyms.FindAsync(id);

            if (gym == null)
            {
                return NotFound();
            }

            return gym;
        }

        // PUT: api/Gyms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGym(int id, UpdateGymDto updatedGym)
        {
            var gym = await _context.Gyms.FindAsync(id);
            if (gym == null)
            {
                return BadRequest();
            }
            gym.Address = updatedGym.Address;
            gym.ImageUrl = updatedGym.ImageUrl;

            _context.Entry(gym).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GymExists(id))
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

        // POST: api/Gyms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<ActionResult<Gym>> PostGym(CreateGymDto gym)
        {
            var newGym = new Gym() { Address = gym.Address, ImageUrl = gym.ImageUrl };
            _context.Gyms.Add(newGym);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGym", new { id = newGym.Id }, newGym);
        }

        // DELETE: api/Gyms/5
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteGym(int id)
        {
            var gym = await _context.Gyms.FindAsync(id);
            if (gym == null)
            {
                return NotFound();
            }

            _context.Gyms.Remove(gym);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GymExists(int id)
        {
            return _context.Gyms.Any(e => e.Id == id);
        }
    }
}
