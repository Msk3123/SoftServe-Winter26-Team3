using AutoMapper;
using Cinema.Application.DTOs.RoleDtos;
using Cinema.Application.DTOs.TagDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{
    public class TagMapper : Profile
    {
        public TagMapper()
        {
            CreateMap<Tag, TagDto>();
            CreateMap<TagCreateDto, Tag>();
            CreateMap<TagPatchDto, Tag>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
