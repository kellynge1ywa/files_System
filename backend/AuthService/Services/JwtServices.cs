using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthService.Models;
using AuthService.Utilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AuthService;

public class JwtServices : Ijwt
{
    private readonly JwtOptions _jwtOptions;
    public JwtServices(IOptions<JwtOptions> options)
    {
        _jwtOptions = options.Value;
    }
    public string GenerateToken(AppUser appUser, IEnumerable<string> Roles)
    {
        var myKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SecretKey));

        var cred = new SigningCredentials(myKey, SecurityAlgorithms.HmacSha256);

        //payload
        List<Claim> claims = new List<Claim>();
        claims.Add(new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub, appUser.Id.ToString()));

        claims.AddRange(Roles.Select(k => new Claim(ClaimTypes.Role, k)));

        //token
        var tokendescriptor = new SecurityTokenDescriptor()
        {
            Issuer = _jwtOptions.Issuer,
            Audience = _jwtOptions.Audience,
            Expires = DateTime.UtcNow.AddHours(2),
            Subject = new ClaimsIdentity(claims),
            SigningCredentials = cred
        };
        var token = new JwtSecurityTokenHandler().CreateToken(tokendescriptor);
        return new JwtSecurityTokenHandler().WriteToken(token);

    }
}
