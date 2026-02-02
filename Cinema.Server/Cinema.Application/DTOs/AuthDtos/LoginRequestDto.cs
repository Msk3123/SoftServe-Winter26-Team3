namespace Cinema.Application.DTOs.AuthDtos;

public sealed record LoginRequestDto(
    string Email,
    string Password);
