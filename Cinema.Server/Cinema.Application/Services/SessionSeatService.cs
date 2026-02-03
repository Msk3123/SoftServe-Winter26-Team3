using Cinema.Application.Common.Configurations;
using Cinema.Application.Common.Exceptions;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Hangfire;
using Microsoft.Extensions.Options;
using System;
using System.Runtime;
using System.Threading.Tasks;

namespace Cinema.Application.Services
{
    public class SessionSeatService : ISessionSeatService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBackgroundJobClient _backgroundJobs;
        private readonly CinemaSettings _settings;
        public SessionSeatService(IUnitOfWork unitOfWork, IBackgroundJobClient backgroundJobs, IOptions<CinemaSettings> options)
        {
            _unitOfWork = unitOfWork;
            _backgroundJobs = backgroundJobs;
            _settings = options.Value;
        }

        public async Task<bool> ReserveSeatAsync(int seatId, int userId)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(userId);
            if (user == null) throw new KeyNotFoundException($"User {userId} not found.");

            var seat = await _unitOfWork.SessionSeats.GetByIdAsync(seatId);

            if (seat == null) throw new KeyNotFoundException("Seat not found.");
            if (seat.SeatStatuses != SeatStatus.Available) throw new SeatsAlreadyTakenException();

            seat.LockedByUserId = userId;
            seat.SeatStatuses = SeatStatus.Reserved;
            seat.LockExpiration = DateTime.UtcNow.AddMinutes(_settings.SessionSeatLockExpirationMinutes);

            await _unitOfWork.SaveChangesAsync();

            return true;
        }

    }
}
