using GymApi.Context;
using GymApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Controllers
{
    [Route("api/plans-benefits")]
    [ApiController]
    public class PlanBenefitsController : ControllerBase
    {
        private readonly GymDbContext _context;

        public PlanBenefitsController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/PlanBenefits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanBenefit>>> GetPlanBenefits()
        {
            return await _context.PlanBenefits.ToListAsync();
        }

        // GET: api/PlanBenefits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlanBenefit>> GetPlanBenefit(int id)
        {
            var planBenefit = await _context.PlanBenefits.FindAsync(id);

            if (planBenefit == null)
            {
                return NotFound();
            }

            return planBenefit;
        }

        // PUT: api/PlanBenefits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlanBenefit(int id, PlanBenefit planBenefit)
        {
            if (id != planBenefit.Id)
            {
                return BadRequest();
            }

            _context.Entry(planBenefit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanBenefitExists(id))
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

        // POST: api/PlanBenefits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlanBenefit>> PostPlanBenefit(PlanBenefit planBenefit)
        {
            _context.PlanBenefits.Add(planBenefit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlanBenefit", new { id = planBenefit.Id }, planBenefit);
        }

        // DELETE: api/PlanBenefits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlanBenefit(int id)
        {
            var planBenefit = await _context.PlanBenefits.FindAsync(id);
            if (planBenefit == null)
            {
                return NotFound();
            }

            _context.PlanBenefits.Remove(planBenefit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlanBenefitExists(int id)
        {
            return _context.PlanBenefits.Any(e => e.Id == id);
        }
    }
}
