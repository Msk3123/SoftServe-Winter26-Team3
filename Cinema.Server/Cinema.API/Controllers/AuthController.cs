using Cinema.Application.DTOs.AuthDtos;
using Cinema.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        return Ok(result);
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] AuthResponseDto dto)
    {
        var result = await _authService.RefreshTokenAsync(dto);
        return Ok(result);
    }
    [HttpPost("change-password")] // Шлях: api/Auth/change-password
    [Authorize] // Потребує токен
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        // Отримуємо ID (в токені це "nameid", що є ClaimTypes.NameIdentifier)
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        var result = await _authService.ChangePasswordAsync(userId, dto.NewPassword);

        if (!result)
            return BadRequest(new { message = "Не вдалося змінити пароль" });

        return Ok(new { message = "Пароль змінено в базі" });
    }
}