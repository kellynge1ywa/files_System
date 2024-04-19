using AuthService.Models;
using AuthService.Models.Dtos;

namespace AuthService.Services.Iservices
{
    public interface IAppUser
    {
        Task<string> SignUpUser(RegisterUserDto NewUser);

        Task<List<AppUser>> GetUsers();
        Task<AppUser> GetUser(Guid Id);
        Task<LoginResponseDto> SignInUser(LoginRequestDto loginRequest);
    }
}