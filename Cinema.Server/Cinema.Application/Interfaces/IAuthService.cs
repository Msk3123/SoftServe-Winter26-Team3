using Cinema.Application.DTOs.AuthDtos;

namespace Cinema.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginRequestDto dto, CancellationToken ct = default);
    Task<AuthResponseDto> SignUpAsync(SignUpRequestDto dto, CancellationToken ct = default);
}
