using BlogTopcon.Core.Entities;

namespace BlogTopcon.Core.Interfaces.Services
{
    public interface IPostService
    {
        Task CreateAsync(Post post);
        Task<Post?> DeleteAsync(Guid postId, Guid userId);
        Task<IEnumerable<Post>> GetAllAsync(Guid userId);
        Task<Post?> GetAsync(Guid postId, Guid userId);
        Task<Post?> UpdateAsync(Guid postId, Guid userId, Post postAtualizado);
    }
}
