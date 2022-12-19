namespace GymApi.Dtos
{
    public record CreateGymDto(string Address, string ImageUrl);
    public record UpdateGymDto(string Address, string ImageUrl);
}
