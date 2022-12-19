

namespace GymApi.Dtos
{
    public record CreatePlanDto(string Title, double CurrentPrice, double OriginalPrice);
    public record UpdatePlanDto(string Title, double CurrentPrice, double OriginalPrice);
    public record PlanDto(int Id, string Title, double CurrentPrice, double OriginalPrice, BenefitDto[] Benefits);
}
