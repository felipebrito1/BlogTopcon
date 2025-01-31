using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogTopcon.Core.Entities
{
    [Table("posts")]
    public class Post
    {
        public Post(string? title, string? content)
        {
            Id = Guid.NewGuid();
            Title = title;
            Content = content;
            CreationDate = DateTimeOffset.UtcNow;
        }
        public Post(Guid userId, string? title, string? content) : this(title, content)
        {
            Title = title;           Content = content;
            CreationDate = DateTimeOffset.UtcNow;
            UserId = userId;
        }

        [Key]
        [Column("id")]
        public Guid Id { get; private set; }
        [Column("title")]
        public string? Title { get; private set; }
        [Column("content")]
        public string? Content { get; private set; }
        [Column("creationdate")]
        public DateTimeOffset CreationDate { get; private set; }
        [Column("userId")]
        public Guid UserId { get; private set; }
        public void UpdateContent(string? content) => Content = content;
        public void UpdateTitle(string? title) => Title = title;
        public void Update(Post post)
        {
            UpdateContent(post.Content);
            UpdateTitle(post.Title);
        }
    }
}
