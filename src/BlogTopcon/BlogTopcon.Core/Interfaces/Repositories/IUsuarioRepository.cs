using BlogTopcon.Core.Interfaces.Models;

namespace BlogTopcon.Core.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<IUsuario>> GetAllAsync();
        Task<IUsuario?> GetAsync(string userId);
        Task<IUsuario?> DeleteAsync(string userId);
    }
}
