using Cinema.Application.DTOs.HallDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Services
{
    public class HallService : IHallService
    {
        private readonly IUnitOfWork _unitOfWork;
        public HallService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task CreateHallAsync(HallCreateDto dto)
        {
            var hall = new Hall
            {
                HallName = dto.HallName,
                Capacity = dto.Rows * dto.SeatsPerRow,
                Seats = new List<Seat>() 
            };

            for (int row = 1; row <= dto.Rows; row++)
            {
                for (int number = 1; number <= dto.SeatsPerRow; number++)
                {
                    hall.Seats.Add(new Seat
                    {
                        Row = row,
                        SeatNo = number,
                        SeatTypeId = 1
                    });
                }
            }

            await _unitOfWork.Halls.AddAsync(hall);
            await _unitOfWork.SaveChangesAsync();


        }
    }
}
