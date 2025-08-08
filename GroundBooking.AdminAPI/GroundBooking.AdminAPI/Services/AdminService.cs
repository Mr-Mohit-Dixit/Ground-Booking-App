using GroundBooking.AdminAPI.Data;
using GroundBooking.AdminAPI.DTOs;

//using GroundBooking.AdminAPI.DTOs;
using GroundBooking.AdminAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace GroundBooking.AdminAPI.Services
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;

        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        
        public async Task<bool> ApproveGroundAsync(int groundId)
        {
            var ground = await _context.Ground.FindAsync(groundId);
            if (ground == null)
                return false;

            ground.GStatus = "Active";
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> EditGroundAsync(int groundId, EditGroundRequest request)
        {
            var ground = await _context.Ground.FindAsync(groundId);
            if (ground == null)
                return false;

            ground.GName = request.GName;
            ground.Address = request.Address;
            ground.GDescription = request.GDescription;
            ground.GStatus = request.GStatus;
            ground.CId = request.CId;
            var bookingsToUpdate = await _context.Booking
        .Where(b => b.GId == groundId)
        .ToListAsync();
            foreach (var booking in bookingsToUpdate)
            {
                booking.BAmt = request.GPrice; // Assuming EditGroundRequest has GPrice
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Ground>> GetPendingGroundsAsync()
        {
            return await _context.Ground
                .Include(g => g.CId) // adjust if this is a navigation property
                .Where(g => g.GStatus == "Inactive")
                .ToListAsync();
        }

        public async Task<List<Users>> GetAllGroundOwners()
        {
            return await _context.Users
                //.Include(g=>g.RIdNavigation)
                .Where(g => g.RId == 2).ToListAsync();             
        }

        public async Task<IEnumerable<GroundDto>> GetAllGroundsAsync()
        {
            var grounds = await _context.Ground
         .Include(g => g.CIdNavigation)
         .Include(g => g.SIdNavigation)
         .Include(g => g.UIdNavigation)
         .Select(g => new GroundDto
         {
             GId = g.GId,
             GName = g.GName,
             GDescription = g.GDescription,
             Address = g.Address,
             City = g.CIdNavigation.CName,
             OwnerName = g.UIdNavigation.UName,
             Sport = g.SIdNavigation.SName,
             Status = g.GStatus,
             Images = g.GImages
         })
         .ToListAsync();

            return grounds;
        }

        public async Task<IEnumerable<BookingDto>> GetAllBookingsAsync()
{
            var bookings = await _context.Booking
        .Include(b => b.UIdNavigation)
        .Include(b => b.GIdNavigation)
            .ThenInclude(g => g.CIdNavigation)
        .Include(b => b.GIdNavigation)
            .ThenInclude(g => g.SIdNavigation)
        .Select(b => new BookingDto
        {
            BId = b.BId,
            UserName = b.UIdNavigation.UName,
            GroundName = b.GIdNavigation.GName,
            City = b.GIdNavigation.CIdNavigation.CName,
            Sport = b.GIdNavigation.SIdNavigation.SName,
            Date = b.BDateTime.ToDateTime(TimeOnly.MinValue),
            TimeFrom = b.TimeFrom.ToTimeSpan(), // Fix here
            TimeTo = b.TimeTo.ToTimeSpan(),
            Amount = b.BAmt
        })
        .ToListAsync();

            return bookings;
}
    }

    
}



