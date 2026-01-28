using AutoMapper;
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
        private readonly ISessionRepository _sessionRepository;
        private readonly ISeatRepository _seatRepository;
        private readonly ISessionSeatRepository _sessionSeatRepository;
        private readonly IMapper _mapper;

        public SessionService(
            ISessionRepository sessionRepository,
            ISeatRepository seatRepository,
            ISessionSeatRepository sessionSeatRepository,
            IMapper mapper)
        {
            _sessionRepository = sessionRepository;
            _seatRepository = seatRepository;
            _sessionSeatRepository = sessionSeatRepository;
            _mapper = mapper;
        }

        public async Task<SessionDetailsDto> CreateSessionAsync(SessionCreateDto dto)
        {
            var session = _mapper.Map<Session>(dto);
            await _sessionRepository.AddAsync(session);
            await _sessionRepository.SaveAsync(); 
            var hallSeats = await _seatRepository.GetByHallIdAsync(dto.HallId);
            if (hallSeats.Any())
            {
                var sessionSeats = hallSeats.Select(seat => new SessionSeat
                {
                    SessionId = session.SessionId,
                    SeatId = seat.SeatId,
                    SeatStatuses = SeatStatus.Available,
                    LockedByUserId = null
                }).ToList();

                await _sessionSeatRepository.AddRangeAsync(sessionSeats);
                await _sessionSeatRepository.SaveAsync();
            }

            return _mapper.Map<SessionDetailsDto>(session);
        }
    }
}
