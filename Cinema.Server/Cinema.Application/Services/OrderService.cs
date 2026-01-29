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
                // 1. Отримуємо місця ТА ЇХ ТИПИ (SeatType) для ціни
                var sessionSeats = await _uow.SessionSeats.GetAll()
                    .Include(ss => ss.Seat)
                        .ThenInclude(s => s.SeatType) // Важливо для BasePrice
                    .Where(ss => dto.SessionSeatIds.Contains(ss.SessionSeatId))
                    .ToListAsync();

                if (sessionSeats.Count != dto.SessionSeatIds.Count)
                    throw new KeyNotFoundException("Some selected seats were not found.");

                // Отримуємо тип квитка (напр. Adult), щоб взяти Multiplier
                // Припускаємо, що в dto приходить TicketTypeId
                var ticketType = await _uow.TicketTypes.GetByIdAsync(dto.TicketTypeId);
                if (ticketType == null) throw new KeyNotFoundException("Ticket type not found.");

                // 2. Валідація броні
                foreach (var seat in sessionSeats)
                {
                    if (seat.SeatStatuses != SeatStatus.Reserved || seat.LockExpiration < DateTime.UtcNow)
                        throw new ReservationExpiredException(seat.SessionSeatId);

                    if (seat.LockedByUserId != dto.UserId)
                        throw new SeatNotReservedException(seat.SessionSeatId);
                }

                // 3. Створення Order
                var order = new Order
                {
                    UserId = dto.UserId,
                    SessionId = dto.SessionId,
                    OrderDate = DateTime.UtcNow,
                    OrderStatuses = OrderStatus.Confirmed,
                    Tickets = new List<Ticket>()
                };

                // 4. Створення квитків з РОЗРАХУНКОМ ЦІНИ 💸
                foreach (var seat in sessionSeats)
                {
                    // Формула: Базова ціна місця * Коефіцієнт типу квитка
                    decimal calculatedPrice = seat.Seat.SeatType.BasePrice * ticketType.Multiplier;

                    order.Tickets.Add(new Ticket
                    {
                        SessionSeatId = seat.SessionSeatId,
                        TicketTypeId = ticketType.TicketTypeId,
                        Price = calculatedPrice // Фіксуємо ціну на момент продажу
                    });

                    seat.SeatStatuses = SeatStatus.Sold;
                    seat.LockedByUserId = null;
                    seat.LockExpiration = null;
                }

                await _uow.Orders.AddAsync(order);
                await _uow.SaveChangesAsync();
                await _uow.CommitAsync();

                // 5. Повертаємо деталі (тут репозиторій підтягне все через Include)
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