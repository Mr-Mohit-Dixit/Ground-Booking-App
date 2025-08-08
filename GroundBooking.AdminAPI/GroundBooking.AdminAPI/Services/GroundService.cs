
using GroundBooking.AdminAPI.Data;
using GroundBooking.AdminAPI.DTOs;
using GroundBooking.AdminAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GroundBooking.AdminAPI.Services
{
    public class GroundService : IGroundService
    {
        private readonly ApplicationDbContext _context;

        public GroundService(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Get all pending grounds (status = "Inactive")
        public async Task<List<Ground>> GetPendingGroundsAsync()
        {
            return await _context.Ground
                .Include(g => g.CId) // Include city if needed
                .Where(g => g.GStatus == "Inactive") // filter pending
                .ToListAsync();
        }

        // ✅ Approve ground by setting GStatus = "Active"
        public async Task<bool> ApproveGroundAsync(int groundId)
        {
            var ground = await _context.Ground.FindAsync(groundId);
            if (ground == null) return false;

            ground.GStatus = "Active"; // <-- ✅ Change the status
            await _context.SaveChangesAsync();
            return true;
        }

        // ✅ OPTIONAL: Deactivate a ground (for completeness)
        public async Task<bool> DeactivateGroundAsync(int groundId)
        {
            var ground = await _context.Ground.FindAsync(groundId);
            if (ground == null) return false;

            ground.GStatus = "Inactive"; // deactivate
            await _context.SaveChangesAsync();
            return true;
        }

        //public async Task<bool> EditGroundAsync(int groundId, EditGroundRequest request)
        //{
        //    var ground = await _context.Ground.FindAsync(groundId);
        //    if (ground == null) return false;

        //    ground.GName = request.GName;
        //    ground.Address= request.GAddress;
        //    ground.GStatus = request.GStatus;
        //    ground.CId = request.CId;
        //    ground.UId = request.UId;
        //    // Update other fields as necessary

        //    await _context.SaveChangesAsync();
        //    return true;
        //}
    }
}

//using global::GroundBooking.AdminAPI.Data;
//using global::GroundBooking.AdminAPI.Models;
//using GroundBooking.AdminAPI.Data;
//using GroundBooking.AdminAPI.Models;
//using Microsoft.EntityFrameworkCore;

//namespace GroundBooking.AdminAPI.Services {
//    public class GroundService : IGroundService
//    {
//        private readonly ApplicationDbContext _context;

//        public GroundService(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<List<Ground>> GetPendingGroundsAsync()
//        {
//            return await _context.Ground
//                //.Include(g => g.Owner) // If there's a relation with User or Owner
//                .Include(g => g.CId)
//                .Where(g => g.GStatus == "Inactive") // or "Pending" 
//                .ToListAsync();
//        }

//        public async Task<bool> ApproveGroundAsync(int groundId)
//        {
//            var ground = await _context.Ground.FindAsync(groundId);
//            if (ground == null) return false;

//            //ground.isapproved = true;
//            await _context.SaveChangesAsync();
//            return true;
//        }
//    }
//}