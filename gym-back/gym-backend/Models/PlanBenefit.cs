using Microsoft.EntityFrameworkCore;

namespace GymApi.Models
{
    [PrimaryKey(nameof(PlanId), nameof(BenefitId))]
    public class PlanBenefit
    {
        public int PlanId { get; set; }
        public Plan Plan { get; set; }
        public int BenefitId { get; set; }
        public Benefit Benefit { get; set; }
    }
}
