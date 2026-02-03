using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class ReservationExpiredException : Exception
    {
        public int SeatId { get; }
        public ReservationExpiredException(int seatId):base("reservation already expired")
        {
            seatId = SeatId;
        }
    }
}
