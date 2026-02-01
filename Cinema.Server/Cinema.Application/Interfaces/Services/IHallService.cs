using Cinema.Application.DTOs.HallDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
     public interface IHallService
    {
        Task CreateHallAsync(HallCreateDto dto);
    }
}
