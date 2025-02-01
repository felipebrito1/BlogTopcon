using BlogTopcon.Core.Interfaces.Models;
using BlogTopcon.Core.Interfaces.Repositories;
using BlogTopcon.Core.Interfaces.Services;

namespace BlogTopcon.Core.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository) => _usuarioRepository = usuarioRepository;


        public async Task<IEnumerable<IUsuario>?> GetAllAsync(Guid userAuthId)
        {
            if (!await UserIsAdminAsync(userAuthId))
                return [];

            return await _usuarioRepository.GetAllAsync();
        }


        public async Task<IUsuario?> DeleteAsync(string userId, Guid userAuthId)
        {
            if (!await UserIsAdminAsync(userAuthId))
                return null;

            return await _usuarioRepository.DeleteAsync(userId);
        }
        private async Task<bool> UserIsAdminAsync(Guid userId)
        {
            var user = await _usuarioRepository.GetAsync(userId.ToString());
            return user?.IsAdmin ?? false;
        }
    }
}
