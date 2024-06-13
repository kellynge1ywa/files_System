namespace Files;

public interface IUser
{
     Task<UserDto> GetUser(Guid userId, string token);
}
