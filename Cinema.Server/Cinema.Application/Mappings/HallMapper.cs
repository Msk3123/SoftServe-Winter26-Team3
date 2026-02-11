using AutoMapper;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.HallDtos;
using Cinema.Application.DTOs.SessionDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{
    public class HallMapper : Profile
    {
        public HallMapper()
        {
            CreateMap<Hall, HallShortDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.HallId));

            CreateMap<HallCreateDto, Hall>();

            CreateMap<HallPatchDto, Hall>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (srcMember is not int i || i != 0)));
        }
    }
}
