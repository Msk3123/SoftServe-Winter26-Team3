using AutoMapper;
using Cinema.Application.DTOs.SeatTypeDtos;
using Cinema.Domain.Entities;

namespace Cinema.Application.Mappings
{
    public class SeatTypeMapper : Profile
    {
        public SeatTypeMapper()
        {
            CreateMap<SeatType, SeatTypeDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.SeatTypeId));

            CreateMap<SeatTypeCreateDto, SeatType>();

            CreateMap<SeatTypePatchDto, SeatType>()
                 .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                 srcMember != null &&
                 !(srcMember is int i && i == 0) &&
                 !(srcMember is decimal d && d == 0)));
        }
    }
}