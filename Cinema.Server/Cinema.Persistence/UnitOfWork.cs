using Cinema.Application.Interfaces;
using Cinema.Persistence.Context;
using Cinema.Persistence.Repositories;
using Microsoft.EntityFrameworkCore.Storage;

namespace Cinema.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private IDbContextTransaction _transaction;

        private IOrderRepository _orders;
        private ISessionSeatRepository _sessionSeats;
        private ITicketRepository _tickets;
        private ITicketTypeRepository _ticketTypes;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public IOrderRepository Orders => _orders ??= new OrderRepository(_context);
        public ISessionSeatRepository SessionSeats => _sessionSeats ??= new SessionSeatRepository(_context);
        public ITicketRepository Tickets => _tickets ??= new TicketRepository(_context);
        public ITicketTypeRepository TicketTypes => _ticketTypes ??= new TicketTypeRepository(_context);

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            try
            {
                await _transaction.CommitAsync();
            }
            finally
            {
                await _transaction.DisposeAsync();
            }
        }

        public async Task RollbackAsync()
        {
            await _transaction.RollbackAsync();
            await _transaction.DisposeAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}