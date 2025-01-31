using BlogTopcon.Core.Entities;
using BlogTopcon.Core.Interfaces.Repositories;
using BlogTopcon.Infra.Context;
using Microsoft.EntityFrameworkCore;

namespace BlogTopcon.Infra.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly PostgreeDbContext _context;

        public PostRepository(PostgreeDbContext context) => _context = context;
        public async Task InsertAsync(Post post)
        {
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Post post)
        {
            _context.Posts.Update(post);
            await _context.SaveChangesAsync();
        }

        public async Task<Post?> GetAsync(Guid postId, Guid userId)
        {
            return await _context.Posts.FirstOrDefaultAsync(post => post.Id == postId && post.UserId == userId);
        }
        public async Task<IEnumerable<Post>> GetAllAsync(Guid userId)
        {
            return await _context.Posts.Where(post => post.UserId == userId)
                                       .OrderByDescending(p => p.CreationDate)
                                       .ToListAsync();
        }
        public async Task DeleteAsync(Post post)
        {
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
        }
    }
}
