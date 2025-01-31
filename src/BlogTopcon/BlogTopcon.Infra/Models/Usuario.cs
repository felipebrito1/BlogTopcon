using BlogTopcon.Core.Interfaces.Models;
using Microsoft.AspNetCore.Identity;

namespace BlogTopcon.Infra.Models
{
    public class Usuario : IdentityUser, IUsuario
    {
        public Usuario(string userName)
        {
            UserName = userName;
            CreationDate = DateTimeOffset.UtcNow;
        }
        public DateTimeOffset CreationDate { get; set; }

        public string? Name => UserName;
    }
}
