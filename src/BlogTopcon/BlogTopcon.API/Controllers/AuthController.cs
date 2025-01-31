using BlogTopcon.API.DTOs.Auth;
using BlogTopcon.Infra.Models;
using BlogTopcon.Infra.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthExample.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<Usuario> _userManager;
    private readonly JwtTokenService _jwtTokenService;

    public AuthController(UserManager<Usuario> userManager, JwtTokenService jwtTokenService)
    {
        _userManager = userManager;
        _jwtTokenService = jwtTokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
    {
        var user = await _userManager.FindByNameAsync(model.User);
        if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            return Unauthorized(new { message = "Usuário ou senha inválidos" });

        var token = _jwtTokenService.GenerateToken(user);
        return Ok(new { token });
    }    
}
