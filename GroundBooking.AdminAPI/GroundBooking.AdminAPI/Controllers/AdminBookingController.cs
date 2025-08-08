using Microsoft.AspNetCore.Mvc;

   using global::GroundBooking.AdminAPI.Services;
    using GroundBooking.AdminAPI.DTOs;
    using GroundBooking.AdminAPI.Services;
    using Microsoft.AspNetCore.Mvc;

    namespace GroundBooking.AdminAPI.Controllers
    {
        [Route("api/admin/bookings")]
        [ApiController]
        public class AdminBookingController : ControllerBase
        {
            private readonly IAdminService _adminService;

            public AdminBookingController(IAdminService adminService)
            {
                _adminService = adminService;
            }

            [HttpGet]
            public async Task<IActionResult> GetAllBookings()
            {
                var bookings = await _adminService.GetAllBookingsAsync();
                return Ok(bookings);
            }
        }
    }

