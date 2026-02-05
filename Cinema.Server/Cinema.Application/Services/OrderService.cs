using AutoMapper;
using Cinema.Application.Common.Exceptions;
using Cinema.Application.DTOs.OrderDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrderService(IUnitOfWork uow, IMapper mapper)
        {
            _unitOfWork = uow;
            _mapper = mapper;
        }

        public async Task<OrderDetailsDto> PlaceOrderAsync(OrderCreateDto dto)
        {
            await _unitOfWork.BeginTransactionAsync();

            try
            {
                var selectedSeatIds = dto.SelectedTickets.Select(st => st.SessionSeatId).ToList();
                var selectedTypeIds = dto.SelectedTickets.Select(st => st.TicketTypeId).Distinct().ToList();

  
                var sessionSeats = await _unitOfWork.SessionSeats.GetAll()
                    .Include(ss => ss.Seat)
                        .ThenInclude(s => s.SeatType) 
                    .Where(ss => selectedSeatIds.Contains(ss.SessionSeatId))
                    .ToListAsync();

                var ticketsAlreadyExist = await _unitOfWork.Tickets.GetAll()
                    .AnyAsync(t => selectedSeatIds.Contains(t.SessionSeatId));

                if (ticketsAlreadyExist)
                    throw new SeatsAlreadyTakenException();

                var ticketTypes = await _unitOfWork.TicketTypes.GetAll()
                    .Where(tt => selectedTypeIds.Contains(tt.TicketTypeId))
                    .ToListAsync();

                foreach (var seat in sessionSeats)
                {
                    if (seat.SeatStatuses != SeatStatus.Reserved || seat.LockExpiration < DateTime.UtcNow)
                        throw new ReservationExpiredException(seat.SessionSeatId);

                    if (seat.LockedByUserId != dto.UserId)
                        throw new SeatNotReservedException(seat.SessionSeatId);
                }
                if (sessionSeats.Any(ss => ss.SessionId != dto.SessionId))
                {
                    throw new SessionMismatchException();
                }
                var userExists = await _unitOfWork.Users.GetByIdAsync(dto.UserId);
                if (userExists == null) throw new KeyNotFoundException("User not found");
                var order = new Order
                {
                    UserId = dto.UserId,
                    SessionId = dto.SessionId,
                    OrderDate = DateTime.UtcNow,
                    OrderStatus = OrderStatus.Created,

                    Tickets = new List<Ticket>()
                };
               

                if (sessionSeats.Any(ss => ss.SeatStatuses == SeatStatus.Sold))
                {
                    throw new SeatAlreadySoldException();
                }
                decimal totalOrderAmount = 0;

                foreach (var seat in sessionSeats)
                {
                    var ticketInfo = dto.SelectedTickets.First(st => st.SessionSeatId == seat.SessionSeatId);
                    var tType = ticketTypes.First(tt => tt.TicketTypeId == ticketInfo.TicketTypeId);
                    decimal finalPrice = seat.Seat.SeatType.BasePrice * tType.Multiplier;

                    totalOrderAmount += finalPrice;

                    order.Tickets.Add(new Ticket
                    {
                        SessionSeatId = seat.SessionSeatId,
                        TicketTypeId = tType.TicketTypeId,
                        Price = finalPrice

                    });
                    seat.LockExpiration = DateTime.UtcNow.AddMinutes(15);
                    seat.SeatStatuses = SeatStatus.Reserved;
                }
                order.TotalAmount = totalOrderAmount;
                await _unitOfWork.Orders.AddAsync(order);
                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();

                return _mapper.Map<OrderDetailsDto>(order);
            }
            catch (Exception)
            {
                await _unitOfWork.RollbackAsync();
                throw; 
            }
        }
        
    }
}