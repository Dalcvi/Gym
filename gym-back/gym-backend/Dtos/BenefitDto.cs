namespace GymApi.Dtos
{
    public record BenefitDto(int Id, string Name);
    public record CreateBenefitDto(string Name);
    public record UpdateBenefitDto(string Name);
}
