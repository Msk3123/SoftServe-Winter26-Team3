using Cinema.Application.Interfaces;
using Cinema.Domain.Enums;
using Cinema.Domain.Entities;
using Hangfire;
using System;
using System.Threading.Tasks;
using Cinema.Application.Interfaces.Services;

namespace Cinema.Application.Services
{
    public class SessionSeatService : ISessionSeatService
    {
        private readonly ISessionSeatRepository _repository;
        private readonly IBackgroundJobClient _backgroundJobs;

        public SessionSeatService(ISessionSeatRepository repository, IBackgroundJobClient backgroundJobs)
        {
            _repository = repository;
            _backgroundJobs = backgroundJobs;
        }

        public async Task<bool> ReserveSeatAsync(int seatId, int userId)
        {
            var seat = await _repository.GetByIdAsync(seatId);

            if (seat == null || seat.SeatStatuses != SeatStatus.Available)
                return false;

            seat.LockedByUserId = userId;
            seat.SeatStatuses = SeatStatus.Reserved;
            await _repository.SaveAsync();

            _backgroundJobs.Schedule<ISessionSeatService>(
                service => service.ReleaseSeatIfExpired(seatId, userId),
                TimeSpan.FromMinutes(15));

            return true;
        }
        public async Task ReleaseSeatIfExpired(int seatId, int userId)
        {
            var seat = await _repository.GetByIdAsync(seatId);

            if (seat != null && seat.SeatStatuses == SeatStatus.Reserved && seat.LockedByUserId == userId)
            {
                seat.SeatStatuses = SeatStatus.Available;
                seat.LockedByUserId = null;
                await _repository.SaveAsync();
            }
        }
    }
}