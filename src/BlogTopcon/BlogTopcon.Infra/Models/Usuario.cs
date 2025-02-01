using BlogTopcon.Core.Interfaces.Models;
using Microsoft.AspNetCore.Identity;

namespace BlogTopcon.Infra.Models
{
    public class Usuario : IdentityUser, IUsuario
    {
        public Usuario(string userName, bool isAdmin = false, string? passwordHash = null)
        {
            UserName = userName;
            CreationDate = DateTimeOffset.UtcNow;
            IsAdmin = isAdmin;
            PasswordHash = passwordHash;
        }
        public DateTimeOffset CreationDate { get; set; }
        public bool IsAdmin { get; set; }
        public string? Name => UserName;
    }
}
