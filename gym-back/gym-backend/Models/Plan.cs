using GymApi.Dtos;
using System.Numerics;

namespace GymApi.Models
{
    public class Plan
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double CurrentPrice { get; set; }
        public double OriginalPrice { get; set; }
        public List<PlanBenefit> Benefits { get; set; }

        public PlanDto MapToDto()
        {
            var benefits = Benefits.Select((planBenefit) => planBenefit.Benefit.MapToDto()).ToArray();
            return new PlanDto(Id, Title, CurrentPrice, OriginalPrice, benefits);
        }
    }
}
