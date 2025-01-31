using BlogTopcon.Core.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogTopcon.Core.Interfaces.Services
{
    public interface IUsuarioService
    {
        Task<IEnumerable<IUsuario>> GetAllAsync(Guid userId);
    }
}
