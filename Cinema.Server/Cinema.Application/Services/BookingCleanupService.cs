using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Services
{
    public class BookingCleanupService : IBookingCleanupService
    {
        private readonly IUnitOfWork _unitOfWork;

        public BookingCleanupService(IUnitOfWork uow)
        {
            _unitOfWork = uow;
        }

        public async Task CleanupExpiredBookingsAsync()
        {
            var now = DateTime.UtcNow;
            var deadline = now.AddMinutes(-15);

            var expiredOrders = await _unitOfWork.Orders.GetExpiredConfirmedOrdersAsync(deadline);

            foreach (var order in expiredOrders)
            {
                foreach (var ticket in order.Tickets)
                {
                    if (ticket.SessionSeat != null) ResetSeat(ticket.SessionSeat);
                }
     
                _unitOfWork.Orders.DeleteAsync(order.OrderId);
            }

            var orphanedSeats = await _unitOfWork.SessionSeats.GetExpiredOrphanedSeatsAsync(now);
            foreach (var seat in orphanedSeats) ResetSeat(seat);

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
