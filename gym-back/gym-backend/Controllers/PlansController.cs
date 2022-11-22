using GymApi.Context;
using GymApi.Dtos;
using GymApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Controllers
{
    [Route("api/plans")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly GymDbContext _context;

        public PlansController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/Plans
        [HttpGet]
        [AllowAnonymous]

        public async Task<ActionResult<IEnumerable<Plan>>> GetPlans()
        {
            return await _context.Plans.ToListAsync();
        }

        // GET: api/Plans/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Plan>> GetPlan(int id)
        {
            var plan = await _context.Plans.FindAsync(id);

            if (plan == null)
            {
                return NotFound();
            }

            return plan;
        }

        // PUT: api/Plans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlan(int id, UpdatePlanDto plan)
        {
            if (!PlanExists(id))
            {
                return BadRequest();
            }

            _context.Entry(plan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanExists(id))
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

        // POST: api/Plans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Plan>> PostPlan(CreatePlanDto plan)
        {
            var newPlan = new Plan() { OriginalPrice = plan.OriginalPrice, CurrentPrice = plan.CurrentPrice };
            _context.Plans.Add(newPlan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlan", new { id = newPlan.Id }, newPlan);
        }

        // DELETE: api/Plans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var plan = await _context.Plans.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }

            _context.Plans.Remove(plan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlanExists(int id)
        {
            return _context.Plans.Any(e => e.Id == id);
        }
    }
}
