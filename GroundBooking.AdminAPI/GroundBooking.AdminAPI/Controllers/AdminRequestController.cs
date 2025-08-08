using GroundBooking.AdminAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GroundBooking.AdminAPI.Controllers
{
    [ApiController]
    [Route("api/admin/requests")]
    public class AdminRequestController : Controller
    {
        private readonly IAdminService _adminService;

        public AdminRequestController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPendingRequests()
        {
            var requests = await _adminService.GetPendingRequestsAsync();
            return Ok(requests);
        }

        // PUT api/admin/requests/{rqId}/approve
        [HttpPut("{rqId}/approve")]
        public async Task<IActionResult> ApproveRequest(int rqId)
        {
            var result = await _adminService.ApproveRequestAsync(rqId);
            if (!result) return NotFound(new { message = "Request not found." });

            return Ok(new { message = "Request approved successfully." });
        }

        // PUT api/admin/requests/{rqId}/reject
        [HttpPut("{rqId}/reject")]
        public async Task<IActionResult> RejectRequest(int rqId)
        {
            var result = await _adminService.RejectRequestAsync(rqId);
            if (!result) return NotFound(new { message = "Request not found." });

            return Ok(new { message = "Request rejected successfully." });
        }
    }
}
