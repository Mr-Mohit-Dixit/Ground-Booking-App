using GroundBooking.AdminAPI.DTOs;
using GroundBooking.AdminAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GroundBooking.AdminAPI.Controllers
{   
    [Route("api/admin/grounds")]
    [ApiController]
    public class AdminGroundController : ControllerBase
    {
        private readonly IAdminService _adminService;
        public AdminGroundController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingGrounds()
        {
            var pendingGrounds = await _adminService.GetPendingGroundsAsync();
            return Ok(pendingGrounds);
        }

        [HttpPut("{GId}/approve")]
        public async Task<IActionResult> ApproveGround(int GId)
        {
             var result = await _adminService.ApproveGroundAsync(GId);
             if (!result)
                 return NotFound(new { message = "Ground not found." });

             return Ok(new { message = "Ground approved successfully." });
        }

        [HttpPut("{GId}/edit")]
        public async Task<IActionResult> EditGround(int GId, [FromBody] EditGroundRequest request)
        {
            var result = await _adminService.EditGroundAsync(GId, request);
            if (!result)
                return NotFound(new { message = "Ground not found." });

            return Ok(new { message = "Ground details updated successfully." });
        }

        [HttpGet("GroundOwnersList")]
        public async Task<IActionResult> GetAllGroundOwners()
        {
            var groundOwnerList = await _adminService.GetAllGroundOwners();
            return Ok(groundOwnerList);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGrounds()
        {
            var grounds = await _adminService.GetAllGroundsAsync();
            var baseUrl = $"{Request.Scheme}://{Request.Host}/";
            foreach (var g in grounds)
            {
                g.Images = baseUrl + "uploads/grounds/" + g.Images;
            }
            return Ok(grounds);
        }
    }
}
