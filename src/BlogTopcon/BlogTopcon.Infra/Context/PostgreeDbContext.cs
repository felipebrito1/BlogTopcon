using BlogTopcon.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BlogTopcon.Infra.Context
{
    public class PostgreeDbContext(DbContextOptions<PostgreeDbContext> options) : DbContext(options)
    {
        public DbSet<Post> Posts { get; set; }
    }
}
