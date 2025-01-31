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
            return await _context.Users.ToListAsync();
        }
        public async Task DeleteAsync(string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
            if (user == null)
                return;
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}
