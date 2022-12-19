using GymApi.Auth;
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

        public async Task<ActionResult<IEnumerable<PlanDto>>> GetPlans()
        {
            return await _context.Plans.Include(plan => plan.Benefits).ThenInclude(planBenefit => planBenefit.Benefit).Select(plan => plan.MapToDto()).ToListAsync();
                
        }

        // GET: api/Plans/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PlanDto>> GetPlan(int id)
        {
            var plan = await _context.Plans.Include(plan => plan.Benefits.Select(planBenefit => planBenefit.Benefit)).FirstOrDefaultAsync(plan => plan.Id == id);

            if (plan == null)
            {
                return NotFound();
            }

            return plan.MapToDto();
        }

        // PUT: api/Plans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> PutPlan(int id, UpdatePlanDto updatedPlan)
        {
            var plan = await _context.Plans.FindAsync(id);
            if (plan == null)
            {
                return BadRequest();
            }
            plan.CurrentPrice = updatedPlan.CurrentPrice;
            plan.OriginalPrice = updatedPlan.OriginalPrice;
            plan.Title = updatedPlan.Title;

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
        [Authorize(Roles = Roles.Admin)]
        public async Task<ActionResult<Plan>> PostPlan(CreatePlanDto plan)
        {
            var newPlan = new Plan() { Title= plan.Title, OriginalPrice = plan.OriginalPrice, CurrentPrice = plan.CurrentPrice };
            _context.Plans.Add(newPlan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlan", new { id = newPlan.Id }, newPlan);
        }

        // DELETE: api/Plans/5
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var plan = await _context.Plans.FindAsync(id);
            if (plan == null)
            {
                return NotFound();
            }

            var usersWithPlan = _context.Users.Where(user => user.PlanId == id).ToList();
            usersWithPlan.ForEach(user => { user.PlanId = null; });

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
