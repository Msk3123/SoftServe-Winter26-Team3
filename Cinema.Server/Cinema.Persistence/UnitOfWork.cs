using AutoMapper;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.PaymentGateway;
using Cinema.Persistence.Context;
using Cinema.Persistence.ExternalServices;
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
        private IPaymentRepository _paymentRepository;
        private IUserRepository _userRepository;
        private IMovieRepository _movieRepository;
        private readonly IMapper _mapper;
        public UnitOfWork(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IOrderRepository Orders => _orders ??= new OrderRepository(_context);
        public ISessionSeatRepository SessionSeats => _sessionSeats ??= new SessionSeatRepository(_context);
        public ITicketRepository Tickets => _tickets ??= new TicketRepository(_context);
        public ITicketTypeRepository TicketTypes => _ticketTypes ??= new TicketTypeRepository(_context);
        public IPaymentRepository Payments => _paymentRepository ??= new PaymentRepository(_context);
        public IUserRepository Users => _userRepository ??= new UserRepository(_context);
        public ISessionRepository Sessions => new SessionRepository(_context);
        public ISeatRepository Seats => new SeatRepository(_context);
        public IMovieRepository Movies => new MovieRepository(_context, _mapper);
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