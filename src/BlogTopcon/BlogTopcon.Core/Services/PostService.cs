using BlogTopcon.Core.Entities;
using BlogTopcon.Core.Interfaces.Repositories;
using BlogTopcon.Core.Interfaces.Services;

namespace BlogTopcon.Core.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;

        public PostService(IPostRepository postRepository) => _postRepository = postRepository;

        public async Task CreateAsync(Post post)
        {
            await _postRepository.InsertAsync(post);
        }

        public async Task<Post?> DeleteAsync(Guid postId, Guid userId)
        {
            var postParaDeletar = await _postRepository.GetAsync(postId, userId);
            if (postParaDeletar == null)
                return postParaDeletar;

            await _postRepository.DeleteAsync(postParaDeletar);
            return postParaDeletar;
        }

        public async Task<Post?> GetAsync(Guid postId, Guid userId)
        {
            return await _postRepository.GetAsync(postId, userId);
        }

        public async Task<Post?> UpdateAsync(Guid postId, Guid userId, Post post)
        {
            var postParaAtualizar = await _postRepository.GetAsync(postId, userId);
            if (postParaAtualizar == null)
                return postParaAtualizar;

            postParaAtualizar.Update(post);

            await _postRepository.UpdateAsync(postParaAtualizar);

            return postParaAtualizar;
        }

        public async Task<IEnumerable<Post>> GetAllAsync(Guid userId)
        {
            return await _postRepository.GetAllAsync(userId);
        }
    }
}
