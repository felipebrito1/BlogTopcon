
namespace BlogTopcon.API.DTOs
{
    public record PostDto
    {
        public Guid? Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime? CreationDate { get; set; }
    }
}
