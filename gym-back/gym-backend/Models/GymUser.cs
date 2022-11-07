using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace GymApi.Models
{
    public class GymUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Range(12, 150)]
        public int Age { get; set; }
        public int? PlanId { get; set; }
        public Plan? Plan { get; set; }
        public DateTime PlanEnd { get; set; }
    }
}
