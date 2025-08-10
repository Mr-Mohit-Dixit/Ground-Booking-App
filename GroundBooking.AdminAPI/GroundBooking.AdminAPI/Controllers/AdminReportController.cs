using GroundBooking.AdminAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GroundBooking.AdminAPI.Controllers
{
    [ApiController]
    [Route("api/admin/reports")]
    public class AdminReportController : ControllerBase
    {
        private readonly IAdminReportService _reportService;

        public AdminReportController(IAdminReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public async Task<IActionResult> DownloadReport([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var reportBytes = await _reportService.GenerateReportAsync(startDate, endDate);

            var fileName = $"GroundBookingReport_{DateTime.Now:yyyyMMddHHmmss}.csv";

            return File(reportBytes, "text/csv", fileName);
        }
    }
}
