using GroundBooking.AdminAPI.DTOs;
using GroundBooking.AdminAPI.Models;

namespace GroundBooking.AdminAPI.Services
{
    public interface IAdminService
    {
        Task<List<Ground>> GetPendingGroundsAsync();
        Task<bool> ApproveGroundAsync(int groundId);
        Task<bool> EditGroundAsync(int groundId, EditGroundRequest request);
        Task<List<Users>> GetAllGroundOwners();
        Task<IEnumerable<BookingDto>> GetAllBookingsAsync();
        Task<IEnumerable<GroundDto>> GetAllGroundsAsync();
        Task<bool> ApproveRequestAsync(int rqId);
        Task<bool> RejectRequestAsync(int rqId);
        Task<IEnumerable<RequestDto>> GetPendingRequestsAsync();
    }
}
