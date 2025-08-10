using System.Text;
using System.Threading.Tasks;
using GroundBooking.AdminAPI.Data;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace GroundBooking.AdminAPI.Services
{
    public class AdminReportService : IAdminReportService
    {
        private readonly ApplicationDbContext _context;

        public AdminReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<byte[]> GenerateReportAsync(DateTime? startDate, DateTime? endDate)
        {
            var query = _context.Booking
                .Include(b => b.UIdNavigation)
                .Include(b => b.GIdNavigation)
                .ThenInclude(g => g.CIdNavigation)
                .AsQueryable();

            if (startDate.HasValue && endDate.HasValue)
            {
                query = query.Where(b =>
                        b.BDateTime.ToDateTime(TimeOnly.MinValue) >= startDate.Value &&
                        b.BDateTime.ToDateTime(TimeOnly.MinValue) <= endDate.Value);
            }

            var bookings = await query.OrderBy(d=>d.BDateTime).ToListAsync();

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