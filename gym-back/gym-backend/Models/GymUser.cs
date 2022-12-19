using GymApi.Dtos;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace GymApi.Models
{
    public class GymUser : IdentityUser, IMappable<UserDto>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Range(12, 150)]
        public int Age { get; set; }
        public int? PlanId { get; set; }
        public Plan? Plan { get; set; }
        public DateTime PlanEnd { get; set; }
        public string? AvatarUrl { get; set; }

        public UserDto MapToDto()
        {
            return new UserDto(Id, Email, FirstName, LastName, Age, PlanId, PlanEnd, AvatarUrl);
        }
    }
}
