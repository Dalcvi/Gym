using Microsoft.EntityFrameworkCore;

namespace GymApi.Models
{
    [PrimaryKey(nameof(UserId), nameof(BookingId))]
    public class UserBooking
    {
        public string UserId { get; set; }
        public GymUser User { get; set; }
        public int BookingId { get; set; }
        public Booking Booking { get; set; }
    }
}
