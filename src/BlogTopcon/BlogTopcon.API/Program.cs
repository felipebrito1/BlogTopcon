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

// Habilitar logs detalhados de PII (usado para depura��o)
IdentityModelEventSource.ShowPII = true;  // Ativa a exposi��o de PII
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
                  .AllowAnyMethod()    // Permite qualquer m�todo (GET, POST, etc.)
                  .AllowAnyHeader();   // Permite qualquer cabe�alho
        });
});

// Adicionar o contexto de banco de dados com a string de conex�o
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
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;  // Define o esquema padr�o para autentica��o
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;     // Define o esquema padr�o para desafios (quando o token n�o � v�lido ou est� ausente)
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

// For�ar a cria��o ou atualiza��o do banco de dados
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
