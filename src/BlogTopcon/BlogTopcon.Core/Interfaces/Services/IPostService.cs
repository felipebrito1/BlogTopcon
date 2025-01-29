using BlogTopcon.Core.Entities;

namespace BlogTopcon.Core.Interfaces.Services
{
    public interface IPostService
    {
        Task CreateAsync(Post post);
        Task<Post?> DeleteAsync(Guid postId);
        Task<IEnumerable<Post>> GetAllAsync();
        Task<Post?> GetAsync(Guid postId);
        Task<Post?> UpdateAsync(Guid postId, Post postAtualizado);
    }
}
