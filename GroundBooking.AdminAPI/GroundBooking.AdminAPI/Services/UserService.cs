namespace GroundBooking.AdminAPI.Services
{
    using global::GroundBooking.AdminAPI.Data;
    using global::GroundBooking.AdminAPI.Models;
    using Microsoft.EntityFrameworkCore;

    namespace GroundBooking.AdminAPI.Services
    {
        public class UserService : IUserService
        {
            private readonly ApplicationDbContext _context;

            public UserService(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<bool> DisableUserAsync(int userId)
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null) return false;

                //user.isActive = false; //- TODO - Add isActive field in user model
                await _context.SaveChangesAsync();
                return true;
            }

            public async Task<bool> EnableUserAsync(int userId)
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null) return false;

                //user.isActive = true; //- TODO - Add isActive field in user model
                await _context.SaveChangesAsync();
                return true;
            }

            public async Task<List<Users>> GetAllUsersAsync()
            {
                return await _context.Users.ToListAsync();
            }
            public async Task<bool> ResetPasswordAsync(int userId, string newPassword)
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null) return false;

                // You can hash the password here if needed
                user.Passwords = newPassword;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }

}
