using AuthService.Models;
using AuthService.Models.Dtos;

namespace AuthService.Services.Iservices
{
    public interface IAppUser
    {
        Task<string> SignUpUser(RegisterUserDto NewUser);

        Task<List<AppUser>> GetUsers();
        Task<AppUser> GetOneUser(Guid UserId);
        Task<AppUser> GetUser(Guid userId, string token);
        Task<LoginResponseDto> SignInUser(LoginRequestDto loginRequest);
    }
}