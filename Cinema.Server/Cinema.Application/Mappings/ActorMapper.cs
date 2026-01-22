using AutoMapper;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.ActorDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{
    public class ActorMapper : Profile
    {
        public ActorMapper()
        {
            CreateMap<Actor, ActorShortDto>(); // Автоматично змапить однакові назви полів

            CreateMap<Actor, ActorDetailsDto>()
                .ForMember(dest => dest.Movies, opt => opt.MapFrom(src =>
                    src.ActorMovies.Select(am => am.Movie.Title).ToList()));

            CreateMap<ActorCreateDto, Actor>();

            CreateMap<ActorPatchDto, Actor>()
                .ForAllMembers(opts => {
                    opts.Condition((src, dest, srcMember) =>
                        srcMember != null &&
                        (srcMember is not int i || i != 0)
                    );
                });
        }
    }
}
