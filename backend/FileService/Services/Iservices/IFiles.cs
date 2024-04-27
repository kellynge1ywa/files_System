namespace FileService;

public interface IFiles
{
    Task<string> AddFile(IFormFile newFile);

    Task<List<FileDetails>> GetFiles(Guid UserId);
    Task<List<FileDetails>> GetAllFiles();
    Task<FileDetails> GetFile(Guid Id);
    Task<string> UpdateFile(FileDetails updateFile);
    Task<string> DeleteFile(Guid Id);

}
