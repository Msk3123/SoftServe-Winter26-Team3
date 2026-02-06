using Cinema.Application.DTOs.HallDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
     public interface IHallService
    {
        Task<Hall> CreateHallAsync(HallCreateDto dto);
        Task UpdateHallAsync(int id,HallCreateDto dto);
        Task DeleteHallAsync(int id);
    }
}
