using AuthService.Models;

namespace AuthService;

public interface Ijwt
{
    string GenerateToken(AppUser appUser, IEnumerable<string> Roles);

}
