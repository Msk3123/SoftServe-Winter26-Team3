using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.AuthDtos
{
    public class AuthResponseDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime RefreshTokenExpiration { get; set; }
    }
}
