using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class ReservationExpiredException : Exception
    {
        public int SeatId { get; }
        public ReservationExpiredException(int seatId) => SeatId = seatId;
    }
}
