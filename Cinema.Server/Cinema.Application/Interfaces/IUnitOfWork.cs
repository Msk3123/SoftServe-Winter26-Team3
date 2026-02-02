using Cinema.Application.Interfaces;
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
        IPaymentRepository Payments { get; }
        IUserRepository Users { get; }

        ISessionRepository Sessions { get; }
        ISeatRepository Seats { get; }
        IMovieRepository Movies { get; }
        IHallRepository Halls { get; }
        Task<int> SaveChangesAsync();
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}