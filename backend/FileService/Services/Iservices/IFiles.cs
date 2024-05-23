namespace FileService;

public interface IFiles
{
    Task<string> AddFile(FileDetails newFile);
    Task SaveFile(UploadFileDto uploadFile);

    Task<List<FileDetails>> GetFiles(Guid UserId);
    Task<List<FileDetails>> GetAllFiles();
    Task<List<FileDetails>> GetFolderFiles(Guid FolderId, Guid UserId);
    Task<FileDetails> GetFile(Guid Id);
    Task<FileDetails> GetFileByName(string Filename);
    Task<string> UpdateFile(FileDetails updateFile);
    Task<string> DeleteFile(Guid Id);

}
