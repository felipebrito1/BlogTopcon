using BlogTopcon.Core.Entities;

namespace BlogTopcon.Core.Interfaces.Repositories
{
    public interface IPostRepository
    {
        Task UpdateAsync(Post post);
        Task<Post?> GetAsync(Guid postId, Guid userId);
        Task<IEnumerable<Post>> GetAllAsync(Guid userId);
        Task InsertAsync(Post post);
        Task DeleteAsync(Post post);
    }
}
