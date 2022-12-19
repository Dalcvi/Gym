namespace GymApi.Dtos
{
    public record UserDto(string Id, string Email, string FirstName, string LastName, int Age, int? PlanId, DateTime PlanEnd, string? AvatarUrl);
    public record UpdateUserDto(string FirstName, string LastName, int Age, string? AvatarUrl, int? PlanId);
}

