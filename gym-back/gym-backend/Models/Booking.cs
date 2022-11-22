using GymApi.Dtos;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymApi.Models
{
    public class Booking : IMappable<BookingDto>
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

        public BookingDto MapToDto()
        {
            return new BookingDto(Client.MapToDto(), Trainer.MapToDto(), DateFrom, DateTo, Id);
        }
    }
}
