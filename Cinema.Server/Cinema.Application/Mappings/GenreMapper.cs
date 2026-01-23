using AutoMapper;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.GenreDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{
    public class GenreMapper : Profile
    {
        public GenreMapper()
        {
            CreateMap<Genre, GenreDto>();
            CreateMap<GenreCreateDto, Genre>();
            CreateMap<GenrePatchDto, Genre>()
                .ForAllMembers(opts => {
                    opts.Condition((src, dest, srcMember) => srcMember != null);
                });
        }
    }
}
