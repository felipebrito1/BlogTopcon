using BlogTopcon.Core.Interfaces.Models;
using BlogTopcon.Core.Interfaces.Repositories;
using BlogTopcon.Infra.Context;
using Microsoft.EntityFrameworkCore;

namespace BlogTopcon.Infra.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly PostgreeDbContext _context;

        public UsuarioRepository(PostgreeDbContext context) => _context = context;

        public async Task<IEnumerable<IUsuario>> GetAllAsync()
        {
            return await _context.Users.OrderByDescending(user => user.CreationDate).ToListAsync();
        }

        public async Task<IUsuario?> GetAsync(string userId)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
        }

        public async Task<IUsuario?> DeleteAsync(string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            if (user == null)
                return user;
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
