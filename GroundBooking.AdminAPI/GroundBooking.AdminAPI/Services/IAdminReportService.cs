using System.Threading.Tasks;

namespace GroundBooking.AdminAPI.Services
{
    public interface IAdminReportService
    {
        Task<byte[]> GenerateReportAsync(DateTime? startDate, DateTime? endDate);
    }
}