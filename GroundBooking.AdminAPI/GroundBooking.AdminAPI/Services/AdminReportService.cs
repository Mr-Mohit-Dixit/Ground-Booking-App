using System.Text;
using System.Threading.Tasks;
using GroundBooking.AdminAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace GroundBooking.AdminAPI.Services
{
    public class AdminReportService : IAdminReportService
    {
        private readonly ApplicationDbContext _context;

        public AdminReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<byte[]> GenerateReportAsync()
        {
            var bookings = await _context.Booking
                .Include(b => b.UIdNavigation)
                .Include(b => b.GIdNavigation)
                .ThenInclude(g => g.CIdNavigation)
                .ToListAsync();

            var sb = new StringBuilder();
            sb.AppendLine("BookingId,UserName,GroundName,City,Date,TimeFrom,TimeTo");

            foreach (var booking in bookings)
            {
                sb.AppendLine($"{booking.BId}," +
                              $"{booking.UIdNavigation.UName}," +
                              $"{booking.GIdNavigation.GName}," +
                              $"{booking.GIdNavigation.CIdNavigation.CName}," +
                              $"{booking.BDateTime}," +
                              $"{booking.TimeFrom}," +
                              $"{booking.TimeTo}");
            }

            return Encoding.UTF8.GetBytes(sb.ToString());
        }
    }
}