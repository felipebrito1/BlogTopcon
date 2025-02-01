using BlogTopcon.Core.Interfaces.Models;

namespace BlogTopcon.Core.Interfaces.Services
{
    public interface IUsuarioService
    {
        Task<IUsuario> DeleteAsync(string userId, Guid userAuthId);
        Task<IEnumerable<IUsuario>> GetAllAsync(Guid userId);
    }
}
