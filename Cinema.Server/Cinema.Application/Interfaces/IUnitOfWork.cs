using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IOrderRepository Orders { get; }
        ISessionSeatRepository SessionSeats { get; }
        ITicketRepository Tickets { get; }
        ITicketTypeRepository TicketTypes { get; }
        Task<int> SaveChangesAsync();
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}