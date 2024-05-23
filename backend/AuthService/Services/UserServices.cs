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

        public async Task<AppUser> GetOneUser(Guid UserId)
        {
            return await _appDbContext.AppUsers.Where(k => k.Id == UserId.ToString()).FirstOrDefaultAsync();
        }


        // public async Task<AppUser> GetUser(Guid Id)
        // {
        //     return await _appDbContext.AppUsers.Where(k => k.Id == Id.ToString()).FirstOrDefaultAsync();
        // }

        public async Task<AppUser> GetUser(Guid userId, string token)
        {
            return await _appDbContext.AppUsers.Where(k => k.Id == userId.ToString()).FirstOrDefaultAsync();
        }


        public async Task<List<AppUser>> GetUsers()
        {
            var allUsers = await _appDbContext.AppUsers.ToListAsync();
            return allUsers;
        }


        public async Task<LoginResponseDto> SignInUser(LoginRequestDto loginRequest)
        {
            var user = await _appDbContext.AppUsers.Where(k => k.UserName!.ToLower() == loginRequest.Email.ToLower()).FirstOrDefaultAsync();

            var isPasswordValid = _userManager.CheckPasswordAsync(user, loginRequest.Password).GetAwaiter().GetResult();
            if (!isPasswordValid || user == null)
            {
                return new LoginResponseDto();
            }

            var loggedUser = _mapper.Map<AppUserDto>(user);

            var roles = await _userManager.GetRolesAsync(user);

            var token = _ijwt.GenerateToken(user, roles);

            var loggedInUser = new LoginResponseDto()
            {
                UserDto = loggedUser,
                Token = token
            };
            return loggedInUser;
        }

        public async Task<string> SignUpUser(RegisterUserDto NewUser)
        {
            var newUser = _mapper.Map<AppUser>(NewUser);
            using (var transaction = await _appDbContext.Database.BeginTransactionAsync())
            {
                var result = await _userManager.CreateAsync(newUser, NewUser.Password);

                if (result.Succeeded)
                {
                    if (!_appDbContext.AppUsers.Any())
                    {
                        await _userManager.AddToRoleAsync(newUser, "Admin");
                    }
                    await _appDbContext.SaveChangesAsync();
                    transaction.Commit();
                    return "";
                }
                else
                {
                    transaction.Rollback();
                    return result.Errors.FirstOrDefault()!.Description;
                }
            }

            // {

            //     if (isFirstUser)
            //     {
            //         await _userManager.AddToRoleAsync(newUser, "ADMIN");
            //     }

            //     return "";
            // }
        }
    }
}