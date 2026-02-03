
using Cinema.Application.Common.Configurations;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cinema.Application.Services
{
    public class BookingCleanupService : IBookingCleanupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly CinemaSettings _settings;

        public BookingCleanupService(IUnitOfWork uow, IOptions<CinemaSettings> settings)
        {
            _unitOfWork = uow;
            _settings = settings.Value;
        }

        public async Task CleanupExpiredBookingsAsync()
        {
            var now = DateTime.UtcNow;

            var orderDeadline = now.AddMinutes(-_settings.OrderExpirationMinutes);

            var expiredOrders = await _unitOfWork.Orders.GetExpiredConfirmedOrdersAsync(orderDeadline);

            foreach (var order in expiredOrders)
            {
                foreach (var ticket in order.Tickets)
                {
                    if (ticket.SessionSeat != null)
                    {
                        ResetSeat(ticket.SessionSeat);
                    }
                }
                order.OrderStatus = OrderStatus.Cancelled;
            }

            var orphanedSeats = await _unitOfWork.SessionSeats.GetExpiredOrphanedSeatsAsync(now);

            foreach (var seat in orphanedSeats)
            {
                ResetSeat(seat);
            }

            await _unitOfWork.SaveChangesAsync();
        }

        private void ResetSeat(SessionSeat seat)
        {
            seat.SeatStatuses = SeatStatus.Available;
            seat.LockExpiration = null;
            seat.LockedByUserId = null;
        }
    }
}