using Microsoft.EntityFrameworkCore;

namespace GymApi.Models
{
    [PrimaryKey(nameof(GymId), nameof(UserId))]
    public class GymTrainer
    {
        public int GymId { get; set; }
        public Gym Gym { get; set; }
        public string UserId { get; set; }
        public GymUser User { get; set; }

    }
}
