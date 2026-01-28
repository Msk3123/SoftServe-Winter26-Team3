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

            CreateMap<SessionSeat, SessionSeatShortDto>();

            CreateMap<SessionSeat, SessionSeatDetailsDto>();

            CreateMap<SessionSeatPatchDto, SessionSeat>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                srcMember != null && (srcMember is not decimal d || d > 0)));
        }
    }
}