using AutoMapper;
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
        }
    }
}