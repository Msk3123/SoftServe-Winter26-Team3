using Cinema.Application.Common.Configurations;
using Cinema.Application.Common.Exceptions;
using Cinema.Application.DTOs.HallDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Services
{
    public class HallService : IHallService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly CinemaSettings cinemaSettings;
        public HallService(IUnitOfWork unitOfWork, IOptions<CinemaSettings> options)
        {
            _unitOfWork = unitOfWork;
            cinemaSettings = options.Value;

        }
        public async Task<Hall> CreateHallAsync(HallCreateDto dto)
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
                        SeatTypeId = cinemaSettings.defaultSeatTypeToCreate
                    });
                }
            }

            await _unitOfWork.Halls.AddAsync(hall);
            await _unitOfWork.SaveChangesAsync();
            return hall;
        }
        public async Task UpdateHallAsync(int id, HallCreateDto dto)
        {
            var hall = await _unitOfWork.Halls.GetByIdAsync(id);
            if (hall == null) throw new KeyNotFoundException("Hall not found");

            var hasActiveTickets = await _unitOfWork.Tickets.AnyByHallIdAsync(id);
            if (hasActiveTickets)
            {
                throw new UnavailableOperationException("Cannot update hall structure: tickets are already sold for sessions in this hall.");
            }

            await _unitOfWork.BeginTransactionAsync();
            try
            {
                hall.HallName = dto.HallName;
                var newCapacity = dto.Rows * dto.SeatsPerRow;

                if (hall.Capacity != newCapacity)
                {
                    hall.Capacity = newCapacity;

                    var existingSeats = await _unitOfWork.Seats.GetByHallIdAsync(id);
                    foreach (var seat in existingSeats)
                    {
                        _unitOfWork.Seats.Remove(seat);
                    }

                    for (int row = 1; row <= dto.Rows; row++)
                    {
                        for (int number = 1; number <= dto.SeatsPerRow; number++)
                        {
                            await _unitOfWork.Seats.AddAsync(new Seat
                            {
                                Row = row,
                                SeatNo = number,
                                SeatTypeId = cinemaSettings.defaultSeatTypeToCreate,
                                HallId = id
                            });
                        }
                    }
                }

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();
            }
            catch (Exception)
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
        public async Task DeleteHallAsync(int id)
        {
            var hall = await _unitOfWork.Halls.GetByIdAsync(id);
            if (hall == null) throw new KeyNotFoundException("Hall not found");

            if (await _unitOfWork.Tickets.AnyByHallIdAsync(id))
            {
                throw new UnavailableOperationException("Cannot delete hall: sessions with sold tickets already exist.");
            }

            if (await _unitOfWork.Sessions.AnyByHallIdAsync(id))
            {
                throw new UnavailableOperationException("Cannot delete hall: sessions are scheduled in this hall. Delete sessions first.");
            }

            await _unitOfWork.BeginTransactionAsync();
            try
            {
                var seats = await _unitOfWork.Seats.GetByHallIdAsync(id);
                foreach (var seat in seats)
                {
                    _unitOfWork.Seats.Remove(seat);
                }

                _unitOfWork.Halls.Remove(hall);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();
            }
            catch (Exception)
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
