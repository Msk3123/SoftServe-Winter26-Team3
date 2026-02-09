using AutoMapper;
using Cinema.Application.DTOs.AuthDtos;
using Cinema.Application.DTOs.UserDtos;
using Cinema.Domain.Entities;

namespace Cinema.Application.Mappings;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName));

        CreateMap<RegisterDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.Role, opt => opt.Ignore())
            .ForMember(dest => dest.RoleId, opt => opt.Ignore())
            .ForMember(dest => dest.UserId, opt => opt.Ignore())
            .ForMember(dest => dest.RefreshToken, opt => opt.Ignore())
            .ForMember(dest => dest.ExpiresAt, opt => opt.Ignore());

        CreateMap<UserCreateDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.Orders, opt => opt.Ignore())
            .ForMember(dest => dest.Role, opt => opt.Ignore());

        CreateMap<UserPatchDto, User>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                srcMember != null && (srcMember is not int i || i != 0)));
    }
}