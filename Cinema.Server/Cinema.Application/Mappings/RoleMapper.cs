using AutoMapper;
using Cinema.Application.DTOs.RoleDtos;
using Cinema.Domain.Entities;

namespace Cinema.Application.Mappings
{
    public class RoleMapper : Profile
    {
        public RoleMapper()
        {
            CreateMap<Role, RoleDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.RoleId));

            CreateMap<RoleCreateDto, Role>();

            CreateMap<RolePatchDto, Role>()
                .ForAllMembers(opts => {
                    opts.Condition((src, dest, srcMember) => srcMember != null);
                });
        }
    }
}