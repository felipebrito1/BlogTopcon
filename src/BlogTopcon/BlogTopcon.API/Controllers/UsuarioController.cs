using BlogTopcon.API.Controllers;
using BlogTopcon.API.DTOs.Usuario;
using BlogTopcon.Core.Interfaces.Services;
using BlogTopcon.Infra.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthExample.Controllers;

[Authorize]
[Route("api/usuario")]
[ApiController]
public class UsuarioController : TopconBaseController
{
    
    private readonly IUsuarioService _usuarioService;
    private readonly UserManager<Usuario> _userManager;

    public UsuarioController(IUsuarioService usuarioService, UserManager<Usuario> userManager)
    {
        _usuarioService = usuarioService;
        _userManager = userManager;
    }

    // Retornar todos os usuarios
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> Get()
    {
        var users = await _usuarioService.GetAllAsync(GetUserId());
        var userDtos = users.Select(user => new UserDto(user));
        return Ok(userDtos);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserDto model)
    {
        var user = new Usuario(model.User);
        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { message = "Usuário registrado com sucesso" });
    }
}
