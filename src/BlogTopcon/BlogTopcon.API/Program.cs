using BlogTopcon.Core.Interfaces.Repositories;
using BlogTopcon.Core.Interfaces.Services;
using BlogTopcon.Core.Services;
using BlogTopcon.Infra.Context;
using BlogTopcon.Infra.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()    // Permite qualquer origem
                  .AllowAnyMethod()    // Permite qualquer método (GET, POST, etc.)
                  .AllowAnyHeader();   // Permite qualquer cabeçalho
        });
});

// Adicionar o contexto de banco de dados com a string de conexão
builder.Services.AddDbContext<PostgreeDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostDB")));

builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IPostService, PostService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
