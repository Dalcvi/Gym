using GymApi.Context;
using GymApi.Dtos;
using GymApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Controllers
{
    [Route("api/benefits")]
    [ApiController]
    public class BenefitsController : ControllerBase
    {
        private readonly GymDbContext _context;

        public BenefitsController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/Benefits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Benefit>>> GetBenefits()
        {
            return await _context.Benefits.ToListAsync();
        }

        // GET: api/Benefits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Benefit>> GetBenefit(int id)
        {
            var benefit = await _context.Benefits.FindAsync(id);

            if (benefit == null)
            {
                return NotFound();
            }

            return benefit;
        }

        // PUT: api/Benefits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBenefit(int id, UpdateBenefitDto benefit)
        {
            if (BenefitExists(id))
            {
                return BadRequest();
            }

            _context.Entry(benefit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BenefitExists(id))
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

        // POST: api/Benefits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Benefit>> PostBenefit(CreateBenefitDto benefit)
        {
            var newBenefit = new Benefit() { Name = benefit.Name };
            _context.Benefits.Add(newBenefit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBenefit", new { id = newBenefit.Id }, newBenefit);
        }

        // DELETE: api/Benefits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBenefit(int id)
        {
            var benefit = await _context.Benefits.FindAsync(id);
            if (benefit == null)
            {
                return NotFound();
            }

            _context.Benefits.Remove(benefit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BenefitExists(int id)
        {
            return _context.Benefits.Any(e => e.Id == id);
        }
    }
}
