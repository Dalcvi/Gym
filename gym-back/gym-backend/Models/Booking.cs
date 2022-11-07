using System.ComponentModel.DataAnnotations.Schema;

namespace GymApi.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string TrainerId { get; set; }
        [ForeignKey("TrainerId")]
        public GymUser Trainer { get; set; }
        public string ClientId { get; set; }
        [ForeignKey("ClientId")]
        public GymUser Client { get; set; }
    }
}
