using Cinema.Application.Common.Exceptions;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Hangfire;
using System;
using System.Threading.Tasks;

namespace Cinema.Application.Services
{
    public class SessionSeatService : ISessionSeatService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBackgroundJobClient _backgroundJobs;

        public SessionSeatService(IUnitOfWork unitOfWork, IBackgroundJobClient backgroundJobs)
        {
            _unitOfWork = unitOfWork;
            _backgroundJobs = backgroundJobs;
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
            seat.LockExpiration = DateTime.UtcNow.AddMinutes(15);

            await _unitOfWork.SaveChangesAsync();

            _backgroundJobs.Schedule<ISessionSeatService>(
                service => service.ReleaseSeatIfExpired(seatId, userId),
                TimeSpan.FromMinutes(15));

            return true;
        }
        public async Task ReleaseSeatIfExpired(int seatId, int userId)
        {
            var seat = await _unitOfWork.SessionSeats.GetByIdAsync(seatId);

            if (seat != null && seat.SeatStatuses == SeatStatus.Reserved && seat.LockedByUserId == userId)
            {
                seat.SeatStatuses = SeatStatus.Available;
                seat.LockedByUserId = null;
                await _unitOfWork.SaveChangesAsync();
            }
        }
    }
}