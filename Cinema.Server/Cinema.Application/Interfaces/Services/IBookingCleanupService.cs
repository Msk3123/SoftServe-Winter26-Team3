using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
    public interface IBookingCleanupService
    {
        Task CleanupExpiredBookingsAsync();
        Task ArchiveFinishedSessionsSeatsAsync();
    }
}
