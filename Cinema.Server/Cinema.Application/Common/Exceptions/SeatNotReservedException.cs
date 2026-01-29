using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class SeatNotReservedException : Exception
    {
        public int SeatId { get; }
        public SeatNotReservedException(int seatId) => SeatId = seatId;
    }
}
