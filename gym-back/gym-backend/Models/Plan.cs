namespace GymApi.Models
{
    public class Plan
    {
        public int Id { get; set; }
        public double CurrentPrice { get; set; }
        public double OriginalPrice { get; set; }
        public List<PlanBenefit> Benefits { get; set; }
    }
}
