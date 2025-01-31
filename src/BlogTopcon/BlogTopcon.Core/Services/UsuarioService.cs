using BlogTopcon.Core.Entities;
using BlogTopcon.Core.Interfaces.Models;
using BlogTopcon.Core.Interfaces.Repositories;
using BlogTopcon.Core.Interfaces.Services;

namespace BlogTopcon.Core.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository) => _usuarioRepository = usuarioRepository;


        public async Task<IEnumerable<IUsuario>> GetAllAsync(Guid userId)
        {
            //TODO: Verificar se o userId é de um admin
            return await _usuarioRepository.GetAllAsync();
        }
    }
}
