using GymApi.Dtos;

namespace GymApi.Models
{
    public class Benefit : IMappable<BenefitDto>
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public BenefitDto MapToDto()
        {
            return new BenefitDto(Id, Name);
        }
    }
}
