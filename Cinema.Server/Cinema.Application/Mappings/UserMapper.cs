using AutoMapper;
using Cinema.Application.DTOs.UserDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName));


            CreateMap<UserCreateDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.Orders, opt => opt.Ignore())
                .ForMember(dest => dest.Role, opt => opt.Ignore());

            CreateMap<UserPatchDto, User>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null && (srcMember is not int i || i != 0)));
        }
    }
}
