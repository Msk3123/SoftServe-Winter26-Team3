using AutoMapper;
using Cinema.Application.DTOs.NewsDtos;
using Cinema.Domain.Entities;
using System;

namespace Cinema.Application.Mappings
{
    public class NewsMapper : Profile
    {
        public NewsMapper()
        {
            CreateMap<News, NewsShortDto>()
                .ForMember(dest => dest.ShortContent, opt => opt.MapFrom(src =>
                    string.IsNullOrWhiteSpace(src.NewsContent) || src.NewsContent.Length <= 150
                    ? src.NewsContent
                    : src.NewsContent.Substring(0, src.NewsContent.LastIndexOf(' ', 150))));

            CreateMap<News, NewsDetailsDto>()
                .ForMember(dest => dest.TagName, opt => opt.MapFrom(src => src.Tag.TagName))
                .ForMember(dest => dest.MovieTitle, opt => opt.MapFrom(src => src.Movie.Title))
                .ForMember(dest => dest.ActorFullName, opt => opt.MapFrom(src =>
                    $"{src.Actor.FirstName} {src.Actor.LastName}"));

            CreateMap<NewsPatchDto, News>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
            srcMember != null &&
                (!(srcMember is int) || (int)srcMember != 0) 
                ));
            CreateMap<NewsCreateDto, News>()
                .ForMember(dest => dest.PublishedDate, opt => opt.MapFrom(src =>
                    src.PublishedDate == default ? DateTime.Now : src.PublishedDate));
        }
    }
}