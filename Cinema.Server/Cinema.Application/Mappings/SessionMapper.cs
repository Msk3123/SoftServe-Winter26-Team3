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
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.SessionId))
                .ForMember(dest => dest.MovieTitle, opt => opt.MapFrom(src => src.Movie.Title))
                .ForMember(dest => dest.HallName, opt => opt.MapFrom(src => src.Hall.HallName))
                .ForMember(dest => dest.PosterUrl, opt => opt.MapFrom(src => src.Movie.PosterUrl))
                .ForMember(dest => dest.MovieId, opt => opt.MapFrom(src => src.Movie.MovieId));

            CreateMap<Session, SessionDetailsDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.SessionId))
                .ForMember(dest => dest.Movie, opt => opt.MapFrom(src => src.Movie))
                .ForMember(dest => dest.Hall, opt => opt.MapFrom(src => src.Hall))
                .ForMember(dest => dest.Genres, opt => opt.MapFrom(src =>
                    src.Movie.GenreMovies.Select(gm => gm.Genre.GenreName).ToList()))
                .ForMember(dest => dest.Actors, opt => opt.MapFrom(src =>
                    src.Movie.ActorMovies.Select(am => $"{am.Actor.FirstName} {am.Actor.LastName}").ToList()));

            CreateMap<SessionShortDto, Session>();
            CreateMap<SessionCreateDto, Session>();
            CreateMap<SessionPatchDto, Session>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (srcMember is not int i || i != 0)));

            CreateMap<Session, SessionExtendedDto>()
            .ForMember(dest=> dest.Id, opt => opt.MapFrom(src => src.SessionId))
            .ForMember(dest => dest.Seats, opt => opt.MapFrom(src => src.SessionSeats));
        }
    }
}