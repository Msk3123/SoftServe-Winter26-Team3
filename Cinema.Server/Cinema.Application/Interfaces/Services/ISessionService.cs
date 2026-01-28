using Cinema.Application.DTOs.SessionDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
    public interface ISessionService
    {
       Task<SessionDetailsDto> CreateSessionAsync(SessionCreateDto dto);
    }
}
