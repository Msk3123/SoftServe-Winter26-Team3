using AutoMapper;
using Cinema.Application.DTOs;
using Cinema.Application.DTOs.MovieDtos;
using Cinema.Domain.Entities;
using System.Linq;

namespace Cinema.Application.Mappings
{
    public class MovieMapper : Profile
    {
        public MovieMapper()
        {
            CreateMap<Movie, MovieShortDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.MovieId));

            CreateMap<Movie, MovieDetailsDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.MovieId))

                .ForMember(dest => dest.Genres, opt => opt.MapFrom(src =>
                    src.GenreMovies.Select(gm => gm.Genre)))

                .ForMember(dest => dest.Actors, opt => opt.MapFrom(src =>
                    src.ActorMovies.Select(am => am.Actor)));

            CreateMap<MovieCreateDto, Movie>()

                .ForMember(dest => dest.GenreMovies, opt => opt.MapFrom(src =>
                    src.GenreIds.Select(id => new GenreMovie { GenreId = id })))
                .ForMember(dest => dest.ActorMovies, opt => opt.MapFrom(src =>
                    src.ActorIds.Select(id => new ActorMovie { ActorId = id })));

            CreateMap<MoviePatchDto, Movie>()
                .ForAllMembers(opts => {
                    opts.Condition((src, dest, srcMember) =>
                        srcMember != null &&
                        (srcMember is not int i || i != 0) &&
                        (srcMember is not decimal d || d != 0m)
                    );
                });
        }
    }
}