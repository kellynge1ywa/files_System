namespace FolderService;

public interface IAppUser
{
    Task<AppUserDto> GetUser(Guid userId, string token);

}
