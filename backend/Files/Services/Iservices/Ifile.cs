namespace Files;

public interface Ifile
{
    Task<string> AddFile(Files newFile);
    Task SaveFile(UploadFileDto uploadFile);

    Task<List<Files>> GetFiles(Guid UserId);
    Task<List<Files>> GetAllFiles();
    Task<List<Files>> GetFolderFiles(Guid FolderId, Guid UserId);
    Task<Files> GetFile(Guid Id);
    Task<Files> GetFileByName(string Filename);
    Task<string> UpdateFile(Files updateFile);
    Task<string> DeleteFile(Guid Id);

}
