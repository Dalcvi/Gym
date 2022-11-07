namespace GymApi.Models
{
    public class PlanBenefit
    {
        public int Id { get; set; }
        public int PlanId { get; set; }
        public Plan Plan { get; set; }
        public int BenefitId { get; set; }
        public Benefit Benefit { get; set; }
    }
}
