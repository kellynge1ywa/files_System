namespace FolderService;

public interface IFolder
{
    Task<AppUserDto> GetUser(Guid userId);
    Task<string> AddFolder(Folder newFolder);
    Task<List<Folder>> GetFolders();
    Task<List<Folder>> GetUserFolders(Guid UserId);

    Task<Folder> GetFolder(Guid Id);
    Task<string> UpdateFolder(Folder uptFolder);
    Task<string> DeleteFolder(Guid Id);

}
