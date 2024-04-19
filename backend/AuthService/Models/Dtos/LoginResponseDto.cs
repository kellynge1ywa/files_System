namespace AuthService.Models.Dtos
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = "";

        public AppUserDto UserDto { get; set; } = default!;
    }
}