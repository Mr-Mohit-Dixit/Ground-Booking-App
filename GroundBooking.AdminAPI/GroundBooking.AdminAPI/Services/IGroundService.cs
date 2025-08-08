using GroundBooking.AdminAPI.DTOs;
using GroundBooking.AdminAPI.Models;

namespace GroundBooking.AdminAPI.Services
{
    public interface IGroundService
    {
        Task<List<Ground>> GetPendingGroundsAsync();
        Task<bool> ApproveGroundAsync(int groundId);
        //Task<bool> EditGroundAsync(int groundId, EditGroundRequest request);
    }

}
