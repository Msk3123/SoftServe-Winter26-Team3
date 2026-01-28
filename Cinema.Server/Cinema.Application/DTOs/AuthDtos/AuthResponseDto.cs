namespace Cinema.Application.DTOs.AuthDtos;

public class AuthResponseDto
{
    public string AccessToken { get; set; } = string.Empty;
    public int UserId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
