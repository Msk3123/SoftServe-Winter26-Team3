using System;
using System.Collections.Generic;
using System.Text;

using AutoMapper;
using Cinema.Application.DTOs.SessionSeatDtos;
using Cinema.Domain.Entities;

namespace Cinema.Application.Common.Mappings
{
    public class SessionSeatMappingProfile : Profile
    {
        public SessionSeatMappingProfile()
        {
            CreateMap<SessionSeatCreateDto, SessionSeat>();

            CreateMap<SessionSeat, SessionSeatShortDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.SessionSeatId));

            CreateMap<SessionSeat, SessionSeatDetailsDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.SessionSeatId));

            CreateMap<SessionSeatPatchDto, SessionSeat>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                srcMember != null && (srcMember is not decimal d || d > 0)));

            CreateMap<SessionSeat, SessionSeatExtendedDto>()

    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.SessionSeatId))

    .ForMember(dest => dest.Status, opt => opt.MapFrom(src =>
            src.SeatStatuses == Domain.Enums.SeatStatus.Sold ? "Sold" :
            src.SeatStatuses == Domain.Enums.SeatStatus.Reserved ? "Reserved" :
            "Available"))
    .ForMember(dest => dest.Row, opt => opt.MapFrom(src => src.Seat.Row))
    .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.Seat.SeatNo))
    .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Seat.SeatType.BasePrice))
    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Seat.SeatType.Name));
        }
    }
}