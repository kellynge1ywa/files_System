using AuthService.Models;
using AuthService.Models.Dtos;
using AutoMapper;

namespace AuthService;

public class UsersProfiles : Profile
{
    public UsersProfiles()
    {
        CreateMap<RegisterUserDto, AppUser>().ForMember(dest => dest.UserName, src => src.MapFrom(e => e.Email));
        CreateMap<AppUserDto, AppUser>().ReverseMap();

    }

}
