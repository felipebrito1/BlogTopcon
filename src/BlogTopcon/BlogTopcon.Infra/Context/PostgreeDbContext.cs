using BlogTopcon.Core.Entities;
using BlogTopcon.Infra.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BlogTopcon.Infra.Context
{
    public class PostgreeDbContext(DbContextOptions<PostgreeDbContext> options) :  IdentityDbContext<Usuario>(options)
    {
        public DbSet<Post> Posts { get; set; }
    }
}
