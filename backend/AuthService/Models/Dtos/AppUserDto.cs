namespace AuthService.Models.Dtos
{
    public class AppUserDto
    {
        public Guid Id { get; set; }
        public string Fullname { get; set; } = "";
        public string Email { get; set; } = "";
        public string Residence { get; set; } = "";
        public string MobileNumber { get; set; } = "";
        public string Role { get; set; } = "";

    }

}