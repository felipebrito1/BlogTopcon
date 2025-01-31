using BlogTopcon.Core.Interfaces.Models;

namespace BlogTopcon.API.DTOs.Usuario
{
    public record UserDto
    {
        public UserDto() { }
        public UserDto(IUsuario user)
        {
            Id = user.Id;
            Name = user.Name;
            CreationDateFormat = user.CreationDate.ToLocalTime().ToString("g");
        }
        public string Id { get; set; } = "";
        public string? Name { get; set; }
        public string? CreationDateFormat { get; set; }
    }
}
