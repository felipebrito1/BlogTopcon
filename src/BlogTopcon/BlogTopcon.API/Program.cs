using BlogTopcon.Core.Interfaces.Repositories;
using BlogTopcon.Core.Interfaces.Services;
using BlogTopcon.Core.Services;
using BlogTopcon.Infra.Context;
using BlogTopcon.Infra.Models;
using BlogTopcon.Infra.Repositories;
using BlogTopcon.Infra.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Habilitar logs detalhados de PII (usado para depuração)
IdentityModelEventSource.ShowPII = true;  // Ativa a exposição de PII
builder.Logging.AddConsole(); // Habilita logs no console

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

// Configurar Identity
builder.Services
    .AddIdentity<Usuario, IdentityRole>()
    .AddEntityFrameworkStores<PostgreeDbContext>()
    .AddDefaultTokenProviders();

// Configurar JWT
var key = Encoding.UTF8.GetBytes(config["Jwt:Key"]);

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;  // Define o esquema padrão para autenticação
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;     // Define o esquema padrão para desafios (quando o token não é válido ou está ausente)
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],  // Exemplo: "your-issuer"
            ValidAudience = builder.Configuration["Jwt:Audience"],  // Exemplo: "your-audience"
            IssuerSigningKey = new SymmetricSecurityKey(key)  // Sua chave secreta
        };
    });


builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<JwtTokenService>();

builder.Services.AddAuthorization();

var app = builder.Build();

// Forçar a criação ou atualização do banco de dados
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<PostgreeDbContext>();
    dbContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
