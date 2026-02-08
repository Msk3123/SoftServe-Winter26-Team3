using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
    public interface ITokenService
    {
        string GenerateRefreshToken();
        string CreateToken(User user);
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
    }
}
