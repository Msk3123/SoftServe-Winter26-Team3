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
        private readonly IOrderService _orderService;
        public SessionSeatService(IUnitOfWork unitOfWork, IBackgroundJobClient backgroundJobs, IOptions<CinemaSettings> options, IOrderService orderService)
        {
            _unitOfWork = unitOfWork;
            _backgroundJobs = backgroundJobs;
            _settings = options.Value;
            _orderService = orderService;
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



        public async Task<bool> UnreserveMultipleSeatsAsync(IEnumerable<int> seatIds, int userId)
        {
            if (seatIds == null || !seatIds.Any()) return false;

            await _unitOfWork.BeginTransactionAsync();

            try
            {
                await _orderService.CancelPendingOrdersBySeatsAsync(userId, seatIds);

                var seats = await _unitOfWork.SessionSeats.GetByIdsAsync(seatIds);

                if (!seats.Any())
                    throw new KeyNotFoundException("None of the specified seats were found.");

                foreach (var seat in seats)
                {
                    if (seat.LockedByUserId != null && seat.LockedByUserId != userId)
                    {
                        throw new UnauthorizedAccessException($"Seat {seat.SeatId} is reserved by another user.");
                    }

                    if (seat.SeatStatuses != SeatStatus.Available)
                    {
                        seat.LockedByUserId = null;
                        seat.SeatStatuses = SeatStatus.Available;
                        seat.LockExpiration = null;
                    }
                }


                await _unitOfWork.SaveChangesAsync();

                await _unitOfWork.CommitAsync();

                return true;
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                throw new ApplicationException($"Failed to fully unreserve and cleanup: {ex.Message}", ex);
            }
        }
    }
}
