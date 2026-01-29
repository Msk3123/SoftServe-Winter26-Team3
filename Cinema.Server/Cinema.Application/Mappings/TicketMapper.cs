using AutoMapper;
using Cinema.Application.DTOs.TicketDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{
    public class TicketMapper: Profile
    {
        public TicketMapper()
        {
            CreateMap<Ticket, TicketDetailsDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(src => src.TicketId))
                .ForMember(d => d.MovieTitle, opt => opt.MapFrom(src => src.Order.Session.Movie.Title))
                .ForMember(d => d.Showtime, opt => opt.MapFrom(src =>
                     src.Order.Session.SessionDate.Add(src.Order.Session.SessionTime)))
                .ForMember(d => d.HallName, opt => opt.MapFrom(src => src.Order.Session.Hall.HallName))
                .ForMember(d => d.Row, opt => opt.MapFrom(src => src.SessionSeat.Seat.Row))
                .ForMember(d => d.SeatNo, opt => opt.MapFrom(src => src.SessionSeat.Seat.SeatNo))
                .ForMember(d => d.SeatTypeName, opt => opt.MapFrom(src => src.SessionSeat.Seat.SeatType.Name))
                .ForMember(d => d.TicketTypeName, opt => opt.MapFrom(src => src.TicketType.Name))
                .ForMember(d => d.Price, opt => opt.MapFrom(src => src.Price));

            CreateMap<Ticket, TicketShortDto>()
                .ForMember(d => d.Row, opt => opt.MapFrom(src => src.SessionSeat.Seat.Row))
                .ForMember(d => d.SeatNo, opt => opt.MapFrom(src => src.SessionSeat.Seat.SeatNo))
                .ForMember(d => d.TicketTypeName, opt => opt.MapFrom(src => src.TicketType.Name))
                .ForMember(d => d.Id, opt => opt.MapFrom(src => src.TicketId));
        }
    }
}
