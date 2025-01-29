using BlogTopcon.Core.Entities;

namespace BlogTopcon.Core.Interfaces.Repositories
{
    public interface IPostRepository
    {
        Task UpdateAsync(Post post);
        Task<Post?> GetAsync(Guid postId);
        Task<IEnumerable<Post>> GetAllAsync();
        Task InsertAsync(Post post);
        Task DeleteAsync(Guid postId);
    }
}
