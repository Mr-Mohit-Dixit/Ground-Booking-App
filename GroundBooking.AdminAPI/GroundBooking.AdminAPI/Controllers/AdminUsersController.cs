using GroundBooking.AdminAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GroundBooking.AdminAPI.DTOs;

namespace GroundBooking.AdminAPI.Controllers
{
    [ApiController]
    [Route("api/admin/users")]
    public class AdminUsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public AdminUsersController(IUserService userService)
        {
            _userService = userService;

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPut("{userId}/disable")]
        public async Task<IActionResult> DisableUser(int userId)
        {
            var result = await _userService.DisableUserAsync(userId);
            if (!result) return NotFound(new { message = "User not found." });

            return Ok(new { message = "User disabled successfully." });
        }

        [HttpPut("{userId}/enable")]
        public async Task<IActionResult> EnableUser(int userId)
        {
            var result = await _userService.EnableUserAsync(userId);
            if (!result) return NotFound(new { message = "User not found." });

            return Ok(new { message = "User enabled successfully." });
        }

        [HttpPut("{userId}/reset-password")]
        public async Task<IActionResult> ResetPassword(int userId, [FromBody] ResetPasswordRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.NewPassword))
            {
                return BadRequest(new { message = "New password cannot be empty." });
            }

            var result = await _userService.ResetPasswordAsync(userId, request.NewPassword);
            if (!result)
                return NotFound(new { message = "User not found." });

            return Ok(new { message = "Password reset successfully." });
        }
    }
}
