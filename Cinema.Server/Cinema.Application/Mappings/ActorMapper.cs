using AutoMapper;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.ActorDtos;
using Cinema.Domain.Entities;

namespace Cinema.Application.Mappings
{
    public class ActorMapper : Profile
    {
        public ActorMapper()
        {
            CreateMap<Actor, ActorShortDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ActorId));

            CreateMap<Actor, ActorDetailsDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ActorId))
                .ForMember(dest => dest.Movies, opt => opt.MapFrom(src =>
                    src.ActorMovies.Select(am => am.Movie.Title).ToList()));

            CreateMap<ActorCreateDto, Actor>();

            CreateMap<ActorPatchDto, Actor>()
                .ForAllMembers(opts => {
                    opts.Condition((src, dest, srcMember) => srcMember != null);
                });
        }
    }
}