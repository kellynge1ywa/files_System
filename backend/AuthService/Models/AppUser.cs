using Microsoft.AspNetCore.Identity;

namespace AuthService.Models
{
    public class AppUser : IdentityUser
    {
        public string Fullname { get; set; } = "";
        public DateTime DOB { get; set; }

    }
}