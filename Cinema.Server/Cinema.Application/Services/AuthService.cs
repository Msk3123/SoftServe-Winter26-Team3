using AutoMapper;
using Cinema.Application.DTOs.AuthDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;

namespace Cinema.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public AuthService(
        IUserRepository userRepository,
        IRoleRepository roleRepository,
        IPasswordHasher passwordHasher,
        ITokenService tokenService,
        IMapper mapper,
        IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        var user = _mapper.Map<User>(dto);
        user.PasswordHash = _passwordHasher.HashPassword(dto.Password);

        var role = await _roleRepository.GetByNameAsync("User")
                   ?? throw new Exception("Role not found");
        user.RoleId = role.RoleId;

        user.RefreshToken = _tokenService.GenerateRefreshToken();
        user.ExpiresAt = DateTime.UtcNow.AddDays(7);

        await _userRepository.AddAsync(user);

        await _unitOfWork.SaveChangesAsync();

        return new AuthResponseDto
        {
            AccessToken = _tokenService.CreateToken(user),
            RefreshToken = user.RefreshToken,
            RefreshTokenExpiration = user.ExpiresAt
        };
    }
    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _userRepository.GetByEmailAsync(dto.Email);

        if (user == null || !_passwordHasher.VerifyPassword(dto.Password, user.PasswordHash))
            throw new Exception("Invalid credentials");

        // ОНОВЛЕННЯ ДАНИХ ДЛЯ ІСНУЮЧОГО ЮЗЕРА
        user.RefreshToken = _tokenService.GenerateRefreshToken();
        user.ExpiresAt = DateTime.UtcNow.AddDays(7);

        // EF Core автоматично відстежує зміни в 'user', треба лише зберегти
        await _unitOfWork.SaveChangesAsync();

        return new AuthResponseDto
        {
            AccessToken = _tokenService.CreateToken(user),
            RefreshToken = user.RefreshToken,
            RefreshTokenExpiration = user.ExpiresAt
        };
    }

    public async Task<AuthResponseDto> RefreshTokenAsync(AuthResponseDto dto)
    {
        var principal = _tokenService.GetPrincipalFromExpiredToken(dto.AccessToken);
        if (principal == null)
        {
            throw new Exception("Invalid access token");
        }

        var email = principal.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.Email)?.Value;

        var user = await _userRepository.GetByEmailAsync(email);

        if (user == null || user.RefreshToken != dto.RefreshToken || user.ExpiresAt < DateTime.UtcNow)
        {
            throw new Exception("Session expired. Please log in again.");
        }
        var newAccessToken = _tokenService.CreateToken(user);
        var newRefreshToken = _tokenService.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        user.ExpiresAt = DateTime.UtcNow.AddMinutes(15); 

        await _unitOfWork.SaveChangesAsync();

        return new AuthResponseDto
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            RefreshTokenExpiration = user.ExpiresAt
        };
    }
}