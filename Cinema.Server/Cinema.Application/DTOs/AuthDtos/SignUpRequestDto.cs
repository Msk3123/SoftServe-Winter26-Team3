namespace Cinema.Application.DTOs.AuthDtos;

public sealed record SignUpRequestDto(
    string FirstName,
    string LastName,
    string Phone,
    string Email,
    string Password,
    string ConfirmPassword);
