using GymApi.Auth;
using GymApi.Context;
using GymApi.Dtos;
using GymApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GymApi.Controllers
{
    [Route("api/bookings")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly GymDbContext _context;
        private readonly IAuthorizationService authorizationService;


        public BookingsController(GymDbContext context, IAuthorizationService authorizationService)
        {
            _context = context;
            this.authorizationService = authorizationService;
        }

        // GET: api/Bookings
        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            return await _context.Bookings.Include(booking => booking.Client).Include(booking => booking.Trainer).ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Bookings.Include(booking => booking.Client).Include(booking => booking.Trainer).FirstOrDefaultAsync(booking => booking.Id == id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> PutBooking(int id, UpdateBookingDto bookingUpdate)
        {
            var booking = await _context.Bookings.FindAsync(id);

            var authResult = await authorizationService.AuthorizeAsync(User, booking, Policies.ContentOwner);
            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            booking.DateFrom = bookingUpdate.DateFrom;
            booking.DateTo = bookingUpdate.DateTo;

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = Roles.User)]
        public async Task<ActionResult<Booking>> PostBooking(CreateBookingDto booking)
        {
            var client = await _context.Users.FirstOrDefaultAsync((user) => user.Id == booking.ClientId);
            if (client == null)
                return NotFound();
            var trainer = await _context.Users.FirstOrDefaultAsync((user) => user.Id == booking.TrainerId);
            if (trainer == null)
                return NotFound();

            var requestUserId = User.Claims.Where(c => c.Type == "sub").FirstOrDefault().Value;

            if (!(requestUserId == booking.ClientId || requestUserId == booking.TrainerId))
            {
                return Forbid();
            }


            var newBooking = new Booking() { Client = client, Trainer = trainer, DateFrom = booking.DateFrom, DateTo = booking.DateTo };
            _context.Bookings.Add(newBooking);
            _context.UserBookings.Add(new UserBooking() { User = client, Booking = newBooking });
            _context.UserBookings.Add(new UserBooking() { User = trainer, Booking = newBooking });
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = newBooking.Id }, newBooking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.User)]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            var userId = User.Claims.Where(c => c.Type == "sub").FirstOrDefault().Value;

            if (!(userId == booking.ClientId || userId == booking.TrainerId))
            {
                return Forbid();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.Id == id);
        }
    }
}
