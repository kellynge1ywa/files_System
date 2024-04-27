namespace FileService;

public interface IFolder
{
    Task<FolderDto> GetFolderById(Guid Id);

}
