using GymApi.Context;
using GymApi.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Controllers
{
    [Route("api/user/{userId}/bookings")]
    [ApiController]
    public class UserBookingController : ControllerBase
    {
        private readonly GymDbContext _context;

        public UserBookingController(GymDbContext context)
        {
            _context = context;
        }

        // GET: api/user/5/bookings
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetUserBookings(string userId)
        {
            if (_context.UserBookings == null)
            {
                return NotFound();
            }
            var userBookings = await _context.UserBookings
                .Where(userBooking => userBooking.UserId.Equals(userId))
                .Include(userBooking => userBooking.Booking).ThenInclude(booking => booking.Client)
                .Include(userBooking => userBooking.Booking).ThenInclude(booking => booking.Trainer)
                .ToListAsync();
            return Ok(userBookings.Select(userBooking => userBooking.Booking.MapToDto()));
        }
    }
}
