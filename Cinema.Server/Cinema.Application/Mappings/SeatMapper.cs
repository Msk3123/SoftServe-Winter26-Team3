using AutoMapper;
using Cinema.Application.DTOs.SeatDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{
    public class SeatMappingProfile : Profile
    {
        public SeatMappingProfile()
        {
            CreateMap<Seat, SeatShortDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.SeatId))
                .ForMember(d => d.SeatTypeName, o => o.MapFrom(s => s.SeatType.Name))
                .ForMember(d => d.HallName, o => o.MapFrom(s => s.Hall.HallName));

            CreateMap<Seat, SeatDetailsDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.SeatId))
                .ForMember(d => d.SeatTypeName, o => o.MapFrom(s => s.SeatType.Name))
                .ForMember(d => d.BasePrice, o => o.MapFrom(s => s.SeatType.BasePrice));

            CreateMap<SeatCreateDto, Seat>()
                .ForMember(dest => dest.SeatId, opt => opt.Ignore())
                .ForMember(dest => dest.Hall, opt => opt.Ignore());

            CreateMap<SeatPatchDto, Seat>()
                .ForMember(dest => dest.SeatId, opt => opt.Ignore())
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && (srcMember is not int i || i != 0)));
        }
    }
}