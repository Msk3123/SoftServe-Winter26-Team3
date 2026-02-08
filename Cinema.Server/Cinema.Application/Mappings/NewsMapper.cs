using AutoMapper;
using Cinema.Application.DTOs.NewsDtos;
using Cinema.Domain.Entities;
using Cinema.Application.Helpers;
using System;

namespace Cinema.Application.Mappings
{
    public class NewsMapper : Profile
    {
        public NewsMapper()
        {
            CreateMap<News, NewsShortDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NewsId))
                .ForMember(dest => dest.ShortContent, opt => opt.MapFrom(src =>
                    string.IsNullOrWhiteSpace(src.NewsContent) || src.NewsContent.Length <= 150
                    ? src.NewsContent
                    : StringHelper.GetSafeSubstring(src.NewsContent, 150)));

            CreateMap<News, NewsDetailsDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NewsId))
                .ForMember(dest => dest.Tag, opt => opt.MapFrom(src => src.Tag))
                .ForMember(dest => dest.Movie, opt => opt.MapFrom(src => src.Movie))
                .ForMember(dest => dest.Actor, opt => opt.MapFrom(src => src.Actor));

            CreateMap<NewsPatchDto, News>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (!(srcMember is int) || (int)srcMember != 0)));

            CreateMap<NewsCreateDto, News>()
                .ForMember(dest => dest.PublishedDate, opt => opt.MapFrom(src =>
                    src.PublishedDate == default ? DateTime.Now : src.PublishedDate));
        }
    }
}