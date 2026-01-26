using AutoMapper;
using Cinema.Application.DTOs.SessionDtos;
using Cinema.Domain.Entities;
using System.Linq;

namespace Cinema.Application.Mappings 
{
    public class SessionMapper : Profile
    {
        public SessionMapper()
        {
            CreateMap<Session, SessionShortDto>()
                .ForMember(dest => dest.MovieTitle, opt => opt.MapFrom(src => src.Movie.Title))
                .ForMember(dest => dest.HallName, opt => opt.MapFrom(src => src.Hall.HallName))
                .ForMember(dest => dest.PosterUrl, opt => opt.MapFrom(src => src.Movie.PosterUrl));

            CreateMap<Session, SessionDetailsDto>()
                .ForMember(dest => dest.MovieTitle, opt => opt.MapFrom(src => src.Movie.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Movie.Description))
                .ForMember(dest => dest.PosterUrl, opt => opt.MapFrom(src => src.Movie.PosterUrl))
                .ForMember(dest=>dest.Language, opt => opt.MapFrom(src=>src.Movie.Language))
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Movie.Duration))
                .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Movie.Rating))
                .ForMember(dest => dest.HallName, opt => opt.MapFrom(src => src.Hall.HallName))
                .ForMember(dest => dest.Genres, opt => opt.MapFrom(src =>
                    src.Movie.GenreMovies.Select(gm => gm.Genre.GenreName).ToList()))
                .ForMember(dest => dest.Actors, opt => opt.MapFrom(src =>
                    src.Movie.ActorMovies.Select(am => $"{am.Actor.FirstName} {am.Actor.LastName}").ToList()));
                
            CreateMap<SessionShortDto, Session>();
            CreateMap<SessionCreateDto, Session>();
            CreateMap<SessionPatchDto, Session>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (srcMember is not int i || i != 0)));
        }
    }
}