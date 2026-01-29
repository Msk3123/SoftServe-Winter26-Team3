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
            CreateMap<Ticket, TicketShortDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.TicketId))
                .ForMember(dest => dest.TicketTypeName, opt => opt.MapFrom(src => src.TicketType.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price));
        }
    }
}
