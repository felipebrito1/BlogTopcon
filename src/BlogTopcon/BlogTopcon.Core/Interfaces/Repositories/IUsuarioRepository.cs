using BlogTopcon.Core.Interfaces.Models;

namespace BlogTopcon.Core.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<IUsuario>> GetAllAsync();
    }
}
