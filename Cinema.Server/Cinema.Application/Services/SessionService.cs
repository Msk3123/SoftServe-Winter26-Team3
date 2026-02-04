using AutoMapper;
using Cinema.Application.Common.Configurations;
using Cinema.Application.Common.Exceptions;
using Cinema.Application.DTOs.SessionDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Microsoft.Extensions.Options;

namespace Cinema.Application.Services
{
    public class SessionService : ISessionService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly CinemaSettings _options;

        public SessionService(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IOptions<CinemaSettings> options)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _options = options.Value;
        }

        public async Task<SessionDetailsDto> CreateSessionAsync(SessionCreateDto dto)
        {
            var movie = await _unitOfWork.Movies.GetByIdAsync(dto.MovieId);
            if (movie == null) throw new KeyNotFoundException("Movie not found");

            var duration = TimeSpan.FromSeconds(movie.Duration);

            var existingSessions = await _unitOfWork.Sessions
                .GetSessionsByDateRangeAsync(dto.HallId, dto.SessionDate, dto.SessionDate);

            ValidateSessionOverlap(dto.SessionDate, dto.SessionTime, duration, existingSessions);

            var session = _mapper.Map<Session>(dto);
            var hallSeats = await _unitOfWork.Seats.GetByHallIdAsync(dto.HallId);

            session.SessionSeats = hallSeats.Select(seat => new SessionSeat
            {
                SeatId = seat.SeatId,
                SeatStatuses = SeatStatus.Available
            }).ToList();

            await _unitOfWork.Sessions.AddAsync(session);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<SessionDetailsDto>(session);
        }

        public async Task CreateSessionsBatchAsync(CreateSessionsBatchDto dto)
        {
            var daysCount = (dto.EndDate - dto.StartDate).Days;
            if (daysCount > _options.MaxBatchDays)
                throw new InvalidBatchPeriodException();

            var movie = await _unitOfWork.Movies.GetByIdAsync(dto.MovieId);
            var duration = TimeSpan.FromSeconds(movie.Duration);


            var dbSessions = await _unitOfWork.Sessions
                .GetSessionsByDateRangeAsync(dto.HallId, dto.StartDate, dto.EndDate);

            var allSessionsInContext = dbSessions.ToList();
            var hallSeats = (await _unitOfWork.Seats.GetByHallIdAsync(dto.HallId)).ToList();

            for (var date = dto.StartDate.Date; date <= dto.EndDate.Date; date = date.AddDays(1))
            {
                if (!dto.WeekDays.Contains((int)date.DayOfWeek)) continue;

                foreach (var time in dto.DailySchedule)
                {
                    ValidateSessionOverlap(date, time, duration, allSessionsInContext);

                    var session = new Session
                    {
                        MovieId = dto.MovieId,
                        HallId = dto.HallId,
                        SessionDate = date,
                        SessionTime = time,
                        Movie = movie, 
                        SessionSeats = hallSeats.Select(s => new SessionSeat
                        {
                            SeatId = s.SeatId,
                            SeatStatuses = SeatStatus.Available
                        }).ToList()
                    };

                    allSessionsInContext.Add(session);
                    await _unitOfWork.Sessions.AddAsync(session);
                }
            }

            await _unitOfWork.SaveChangesAsync();
        }

       

        private void ValidateSessionOverlap(
            DateTime date,
            TimeSpan newTime,
            TimeSpan newDuration,
            IEnumerable<Session> existingSessions)
        {
            var cleaningTime = TimeSpan.FromMinutes(_options.CleaningDurationMinutes);
            var newStart = newTime;
            var newEnd = newTime.Add(newDuration).Add(cleaningTime);

            foreach (var s in existingSessions.Where(x => x.SessionDate.Date == date.Date))
            {
                var existingDuration = TimeSpan.FromSeconds(s.Movie.Duration);
                var existingStart = s.SessionTime;
                var existingEnd = s.SessionTime.Add(existingDuration).Add(cleaningTime);

                if (newStart < existingEnd && newEnd > existingStart)
                {
                    throw new SessionOverlapException(
                        $"Schedule conflict on {date:yyyy-MM-dd}: " +
                        $"New session ({newStart:hh\\:mm}-{newEnd:hh\\:mm}, incl. cleaning) " +
                        $"overlaps with '{s.Movie.Title}' ({existingStart:hh\\:mm}-{existingEnd:hh\\:mm}).");
                }
            }
        }
        public async Task DeleteSessionAsync(int sessionId)
        {
            var session = await _unitOfWork.Sessions.GetByIdAsync(sessionId);
            if (session == null) throw new KeyNotFoundException("Session not found");

            if ((session.SessionDate.Date + session.SessionTime) > DateTime.UtcNow)
            {
                var hasTickets = await _unitOfWork.Tickets.AnyBySessionIdAsync(sessionId);
                if (hasTickets)
                {
                    throw new UnavailableOperationException(
                        "Cannot delete an upcoming session because tickets have already been sold. " +
                        "Refund the tickets first.");
                }
            }

            session.IsDeleted = true;

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}