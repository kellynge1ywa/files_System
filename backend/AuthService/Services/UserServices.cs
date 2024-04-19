using AuthService.Data;
using AuthService.Models;
using AuthService.Models.Dtos;
using AuthService.Services.Iservices;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Services
{
    public class UserServices : IAppUser
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        private readonly Ijwt _ijwt;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserServices(AppDbContext appDbContext, IMapper mapper, Ijwt jwt, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
            _ijwt = jwt;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public Task<AppUser> GetUser(Guid Id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<AppUser>> GetUsers()
        {
            var allUsers = await _appDbContext.AppUsers.ToListAsync();
            return allUsers;
        }


        public Task<LoginResponseDto> SignInUser(LoginRequestDto loginRequest)
        {
            throw new NotImplementedException();
        }

        public async Task<string> SignUpUser(RegisterUserDto NewUser)
        {
            var newUser = _mapper.Map<AppUser>(NewUser);
            var isFirstUser = !_appDbContext.AppUsers.Any();
            var result = await _userManager.CreateAsync(newUser);

            if (result.Succeeded)
            {

                if (isFirstUser)
                {
                    await _userManager.AddToRoleAsync(newUser, "Admin");
                }

                return "";
            }
            else
            {
                return result.Errors.FirstOrDefault()!.Description;
            }
        }
    }
}