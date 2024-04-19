using System.ComponentModel.DataAnnotations;

namespace AuthService.Models.Dtos
{
    public class RegisterUserDto
    {
        [Required]
        public string Fullname { get; set; } = "";
        [Required]
        public string Email { get; set; } = "";
        [Required]
        public string Password { get; set; } = "";
        [Required]
        public string Residence { get; set; } = "";
        [Required]
        public string MobileNumber { get; set; } = "";
        public DateTime DOB { get; set; }


        public string Role { get; set; } = "User";
    }
}