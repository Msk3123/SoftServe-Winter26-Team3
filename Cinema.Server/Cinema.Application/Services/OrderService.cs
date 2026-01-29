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
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public OrderService(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<OrderDetailsDto> PlaceOrderAsync(OrderCreateDto dto)
        {
            await _uow.BeginTransactionAsync();

            try
            {
                var selectedSeatIds = dto.SelectedTickets.Select(st => st.SessionSeatId).ToList();
                var selectedTypeIds = dto.SelectedTickets.Select(st => st.TicketTypeId).Distinct().ToList();

  
                var sessionSeats = await _uow.SessionSeats.GetAll()
                    .Include(ss => ss.Seat)
                        .ThenInclude(s => s.SeatType) 
                    .Where(ss => selectedSeatIds.Contains(ss.SessionSeatId))
                    .ToListAsync();

                if (sessionSeats.Count != selectedSeatIds.Count)
                    throw new KeyNotFoundException("Some selected seats were not found.");

                var ticketTypes = await _uow.TicketTypes.GetAll()
                    .Where(tt => selectedTypeIds.Contains(tt.TicketTypeId))
                    .ToListAsync();

                foreach (var seat in sessionSeats)
                {
                    if (seat.SeatStatuses != SeatStatus.Reserved || seat.LockExpiration < DateTime.UtcNow)
                        throw new ReservationExpiredException(seat.SessionSeatId);

                    if (seat.LockedByUserId != dto.UserId)
                        throw new SeatNotReservedException(seat.SessionSeatId);
                }

                var order = new Order
                {
                    UserId = dto.UserId,
                    SessionId = dto.SessionId,
                    OrderDate = DateTime.UtcNow,
                    OrderStatuses = OrderStatus.Confirmed,
                    Tickets = new List<Ticket>()
                };

                foreach (var seat in sessionSeats)
                {
                    var ticketInfo = dto.SelectedTickets.First(st => st.SessionSeatId == seat.SessionSeatId);
                    var tType = ticketTypes.First(tt => tt.TicketTypeId == ticketInfo.TicketTypeId);

                    decimal finalPrice = seat.Seat.SeatType.BasePrice * tType.Multiplier;

                    order.Tickets.Add(new Ticket
                    {
                        SessionSeatId = seat.SessionSeatId,
                        TicketTypeId = tType.TicketTypeId,
                        Price = finalPrice 
                    });

                    seat.SeatStatuses = SeatStatus.Sold;
                    seat.LockedByUserId = null;
                    seat.LockExpiration = null;
                }
 
                await _uow.Orders.AddAsync(order);
                await _uow.SaveChangesAsync();
                await _uow.CommitAsync();

                var completedOrder = await _uow.Orders.GetByIdAsync(order.OrderId);
                return _mapper.Map<OrderDetailsDto>(completedOrder);
            }
            catch (Exception)
            {
                await _uow.RollbackAsync();
                throw; 
            }
        }
    }
}