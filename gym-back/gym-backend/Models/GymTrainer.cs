namespace GymApi.Models
{
    public class GymTrainer
    {
        public int Id { get; set; }
        public int GymId { get; set; }
        public Gym Gym { get; set; }
        public string UserId { get; set; }
        public GymUser User { get; set; }
    }
}
