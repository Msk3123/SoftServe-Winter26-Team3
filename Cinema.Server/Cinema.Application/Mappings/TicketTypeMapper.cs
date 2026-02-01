using AutoMapper;
using Cinema.Application.DTOs.HallDtos;
using Cinema.Application.DTOs.TicketTypeDtos;
using Cinema.Domain.Entities;

namespace Cinema.Application.Mappings
{
    public class TicketTypeMapper : Profile
    {
        public TicketTypeMapper()
        {
            CreateMap<TicketType, TicketTypeDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.TicketTypeId));
            CreateMap<TicketTypeCreateDto, TicketType>();

            CreateMap<TicketTypePatchDto, TicketType>()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                 srcMember != null &&
                 !(srcMember is int i && i == 0) &&
                 !(srcMember is decimal d && d == 0)));

        }
    }
}