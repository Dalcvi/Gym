namespace GymApi.Dtos
{
    public record UserDto(string Id, string FirstName, string LastName, int Age, int PlanId, DateTime PlanEnd);
}

