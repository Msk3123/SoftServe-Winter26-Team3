namespace Cinema.Application.DTOs.AuthDtos;

public sealed record AuthResponseDto(
    string AccessToken,
    int UserId,
    string Email,
    string Role);
