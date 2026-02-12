using Cinema.Application.DTOs.AuthDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
        Task<AuthResponseDto> RefreshTokenAsync(AuthResponseDto dto);
        Task<bool> ChangePasswordAsync(int userId, string newPassword);
        Task VerifyCurrentPasswordAsync(int userId, string password);
    }
}
