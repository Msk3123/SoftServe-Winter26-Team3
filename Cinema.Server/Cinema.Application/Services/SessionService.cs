using AutoMapper;
using Cinema.Application.Common.Exceptions;
using Cinema.Application.DTOs.SessionDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Services
{
    public class SessionService : ISessionService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public SessionService(
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<SessionDetailsDto> CreateSessionAsync(SessionCreateDto dto)
        {
            var movie = await _unitOfWork.Movies.GetByIdAsync(dto.MovieId);
            var duration = TimeSpan.FromSeconds(movie.Duration);

            var existingSessions = await _unitOfWork.Sessions
                .GetSessionsByDateRangeAsync(dto.HallId, dto.SessionDate, dto.SessionDate);

            ValidateSessionOverlap(dto.SessionDate, dto.SessionTime, duration, existingSessions);

            var session = _mapper.Map<Session>(dto);

            var hallSeats = await _unitOfWork.Seats.GetByHallIdAsync(dto.HallId);

            session.SessionSeats = hallSeats.Select(seat => new SessionSeat
            {
                SeatId = seat.SeatId,
                SeatStatuses = SeatStatus.Available,
                LockedByUserId = null
            }).ToList();

            await _unitOfWork.Sessions.AddAsync(session);

            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<SessionDetailsDto>(session);
        }

        public async Task CreateSessionsBatchAsync(CreateSessionsBatchDto dto)
        {
            var movie = await _unitOfWork.Movies.GetByIdAsync(dto.MovieId);
            var duration = TimeSpan.FromSeconds(movie.Duration);

            var existingSessions = await _unitOfWork.Sessions
                .GetSessionsByDateRangeAsync(dto.HallId, dto.StartDate, dto.EndDate);

            var hallSeats = (await _unitOfWork.Seats.GetByHallIdAsync(dto.HallId)).ToList();

            for (var date = dto.StartDate.Date; date <= dto.EndDate.Date; date = date.AddDays(1))
            {
                if (!dto.WeekDays.Contains((int)date.DayOfWeek)) continue;

                foreach (var time in dto.DailySchedule)
                {
                    ValidateSessionOverlap(date, time, duration, existingSessions);

                    var session = new Session
                    {
                        MovieId = dto.MovieId,
                        HallId = dto.HallId,
                        SessionDate = date,
                        SessionTime = time,
                        SessionSeats = hallSeats.Select(s => new SessionSeat
                        {
                            SeatId = s.SeatId,
                            SeatStatuses = SeatStatus.Available
                        }).ToList()
                    };

                    await _unitOfWork.Sessions.AddAsync(session);
                }
            }

            await _unitOfWork.SaveChangesAsync();
        }

        private void ValidateSessionOverlap(
            DateTime date,
            TimeSpan newTime,
            TimeSpan duration,
            IEnumerable<Session> existingSessions)
        {
            var cleaningTime = TimeSpan.FromMinutes(15);
            var totalDuration = duration + cleaningTime;

            var newStart = newTime;
            var newEnd = newTime.Add(totalDuration);

            var overlap = existingSessions.Any(s =>
                s.SessionDate.Date == date.Date &&
                newStart < s.SessionTime.Add(totalDuration) &&
                newEnd > s.SessionTime);

            if (overlap)
            {
                throw new SessionOverlapException(
                    $"Session on {date:yyyy-MM-dd} at {newTime:hh\\:mm} overlaps with an existing schedule in this hall.");
            }
        }
    }
}
