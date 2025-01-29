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

        public async Task<Post?> DeleteAsync(Guid postId)
        {
            var postParaDeletar = await _postRepository.GetAsync(postId);
            if (postParaDeletar == null)
                return postParaDeletar;

            await _postRepository.DeleteAsync(postParaDeletar.Id);
            return postParaDeletar;
        }

        public async Task<Post?> GetAsync(Guid postId)
        {
            return await _postRepository.GetAsync(postId);
        }

        public async Task<Post?> UpdateAsync(Guid postId, Post post)
        {
            var postParaAtualizar = await _postRepository.GetAsync(postId);
            if (postParaAtualizar == null)
                return postParaAtualizar;

            postParaAtualizar.Update(post);

            await _postRepository.UpdateAsync(postParaAtualizar);

            return postParaAtualizar;
        }

        public async Task<IEnumerable<Post>> GetAllAsync()
        {
            return await _postRepository.GetAllAsync();
        }
    }
}
