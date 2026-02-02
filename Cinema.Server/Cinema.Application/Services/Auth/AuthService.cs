using Cinema.Application.DTOs.AuthDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Application.Services.Auth;

public class AuthService : IAuthService
{
    private readonly IUserRepository _users;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwt;

    public AuthService(IUserRepository users, IPasswordHasher passwordHasher, IJwtTokenGenerator jwt)
    {
        _users = users;
        _passwordHasher = passwordHasher;
        _jwt = jwt;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto dto, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
        {
            throw new ArgumentException("Email і пароль обов'язкові");
        }

        // Беремо роль через Include (IUserRepository не має методу GetByEmailWithRoleAsync, тому робимо через IQueryable)
        var user = await _users.GetAll()
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == dto.Email, ct);

        if (user == null)
        {
            throw new UnauthorizedAccessException("Невірний email або пароль");
        }

        var ok = _passwordHasher.VerifyPassword(dto.Password, user.PasswordHash);
        if (!ok)
        {
            throw new UnauthorizedAccessException("Невірний email або пароль");
        }

        return new AuthResponseDto(
            AccessToken: _jwt.Generate(user),
            UserId: user.UserId,
            Email: user.Email ?? string.Empty,
            Role: user.Role?.RoleName ?? string.Empty);
    }

    public async Task<AuthResponseDto> SignUpAsync(SignUpRequestDto dto, CancellationToken ct = default)
    {
        if (dto.Password != dto.ConfirmPassword)
        {
            throw new ArgumentException("Паролі не співпадають");
        }

        var existing = await _users.GetAll().AnyAsync(u => u.Email == dto.Email, ct);
        if (existing)
        {
            throw new InvalidOperationException("Користувач з таким email вже існує");
        }

        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Phone = dto.Phone,
            Email = dto.Email,
            PasswordHash = _passwordHasher.HashPassword(dto.Password),
            // Мінімально: роль 1. Якщо у вас інші дані — підлаштуємо після перевірки таблиці Role.
            RoleId = 1,
        };

        await _users.AddAsync(user);
        await _users.SaveAsync();

        return new AuthResponseDto(
            AccessToken: _jwt.Generate(user),
            UserId: user.UserId,
            Email: user.Email ?? string.Empty,
            Role: user.Role?.RoleName ?? string.Empty);
    }
}
