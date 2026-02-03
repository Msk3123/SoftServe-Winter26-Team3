using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
    public interface ISessionSeatService
    {
    Task<bool> ReserveSeatAsync(int seatId, int userId);
    }
}
