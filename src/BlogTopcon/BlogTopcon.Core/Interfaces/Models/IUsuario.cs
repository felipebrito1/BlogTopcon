namespace BlogTopcon.Core.Interfaces.Models
{
    public interface IUsuario
    {
        public string Id { get; }
        public string? Name { get; }
        public DateTimeOffset CreationDate { get; }
        public bool IsAdmin { get; }

    }
}
