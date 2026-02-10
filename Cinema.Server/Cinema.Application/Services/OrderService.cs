using AutoMapper;
using Cinema.Application.Common.Configurations;
using Cinema.Application.Common.Exceptions;
using Cinema.Application.DTOs.OrderDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Cinema.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly CinemaSettings _cinemaSettings;
        public OrderService(IUnitOfWork uow, IMapper mapper, IOptions<CinemaSettings> options)
        {
            _unitOfWork = uow;
            _mapper = mapper;
            _cinemaSettings = options.Value;
        }

        public async Task<OrderDetailsDto> PlaceOrderAsync(OrderCreateDto dto)
        {
            await _unitOfWork.BeginTransactionAsync();

            try
            {
                var selectedSeatIds = dto.SelectedTickets.Select(st => st.SessionSeatId).ToList();


                await CancelPendingOrdersBySeatsAsync(dto.UserId, selectedSeatIds);
                await _unitOfWork.SaveChangesAsync();


                var activeTicketsExist = await _unitOfWork.Tickets.GetAll()
                    .AnyAsync(t => selectedSeatIds.Contains(t.SessionSeatId) &&
                        (t.TicketStatus == TicketStatus.Active || t.TicketStatus == TicketStatus.Pending));

                if (activeTicketsExist)
                    throw new SeatsAlreadyTakenException();


                var sessionSeats = await _unitOfWork.SessionSeats.GetAll()
                    .Include(ss => ss.Seat).ThenInclude(s => s.SeatType)
                    .Where(ss => selectedSeatIds.Contains(ss.SessionSeatId))
                    .ToListAsync();

                foreach (var seat in sessionSeats)
                {

                    if (seat.SeatStatuses != SeatStatus.Reserved || seat.LockExpiration < DateTime.UtcNow)
                        throw new ReservationExpiredException(seat.SessionSeatId);

                    if (seat.LockedByUserId != dto.UserId)
                        throw new SeatNotReservedException(seat.SessionSeatId);
                }


                var selectedTypeIds = dto.SelectedTickets.Select(st => st.TicketTypeId).Distinct().ToList();
                var ticketTypes = await _unitOfWork.TicketTypes.GetAll()
                    .Where(tt => selectedTypeIds.Contains(tt.TicketTypeId))
                    .ToListAsync();

                var order = new Order
                {
                    UserId = dto.UserId,
                    SessionId = dto.SessionId,
                    OrderDate = DateTime.UtcNow,
                    OrderStatus = OrderStatus.Created,
                    Tickets = new List<Ticket>()
                };

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
                        Price = finalPrice,
                        TicketStatus = TicketStatus.Pending
                    });


                    seat.LockExpiration = DateTime.UtcNow.AddMinutes(_cinemaSettings.OrderExpirationMinutes);
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

        public async Task CancelPendingOrdersBySeatsAsync(int userId, IEnumerable<int> seatIds)
        {
            var pendingOrders = await _unitOfWork.Orders.GetPendingOrdersBySeatsAsync(userId, seatIds);

            foreach (var order in pendingOrders)
            {
                foreach (var ticket in order.Tickets)
                {
                    ticket.TicketStatus = TicketStatus.Cancelled; 
                }
                order.OrderStatus = OrderStatus.Cancelled;
            }
        }

    }
}