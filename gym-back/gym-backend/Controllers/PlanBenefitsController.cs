using GymApi.Context;
using GymApi.Dtos;
using GymApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Controllers
{
    [Route("api/plans/{planId}/benefits")]
    [ApiController]
    public class PlanBenefitsController : ControllerBase
    {
        private readonly GymDbContext _context;

        public PlanBenefitsController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/plans/5/benefits
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<BenefitDto>>> GetPlanBenefits(int planId)
        {
            var planBenefits = await _context.PlanBenefits.Where(planBenefit => planBenefit.PlanId == planId).Include(planBenefit => planBenefit.Benefit).ToListAsync();

            return Ok(planBenefits.Select(planBenefit => planBenefit.Benefit.MapToDto()));
        }

        // POST: api/plans/5/benefits/3
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{benefitId}")]
        public async Task<ActionResult<PlanBenefit>> PostPlanBenefit(int planId, int benefitId)
        {
            _context.PlanBenefits.Add(new PlanBenefit() { PlanId = planId, BenefitId = benefitId });
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/plans/5/benefits/5
        [HttpDelete("{benefitId}")]
        public async Task<IActionResult> DeletePlanBenefit(int planId, int benefitId)
        {
            var planBenefit = await _context.PlanBenefits.FindAsync(planId, benefitId);
            if (planBenefit == null)
            {
                return NotFound();
            }

            _context.PlanBenefits.Remove(planBenefit);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
