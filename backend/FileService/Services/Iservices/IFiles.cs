namespace FileService;

public interface IFiles
{
    Task<string> AddFile(FileDetails newFile);
    Task SaveFile(UploadFileDto uploadFile);

    Task<List<FileDetails>> GetFiles(Guid UserId);
    Task<List<FileDetails>> GetAllFiles();
    Task<FileDetails> GetFile(Guid Id);
    Task<string> UpdateFile(FileDetails updateFile);
    Task<string> DeleteFile(Guid Id);

}
