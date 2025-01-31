
using BlogTopcon.Core.Entities;

namespace BlogTopcon.API.DTOs
{
    public record PostDto
    {
        public PostDto() { }
        public PostDto(Post post)
        {
            Id = post.Id;
            Title = post.Title;
            Content = post.Content;
            CreationDateFormat = post.CreationDate.ToLocalTime().ToString("g");
        }

        public Guid? Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? CreationDateFormat { get; set; }
    }
}
