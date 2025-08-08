// Services/IUserService.cs
using GroundBooking.AdminAPI.Models;

namespace GroundBooking.AdminAPI.Services
{
    public interface IUserService
    {
        Task<bool> ResetPasswordAsync(int userId, string newPassword);
        Task<List<Users>> GetAllUsersAsync();
        Task<bool> DisableUserAsync(int userId);
        Task<bool> EnableUserAsync(int userId);
    }
}
