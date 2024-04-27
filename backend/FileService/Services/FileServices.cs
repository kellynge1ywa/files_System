
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace FileService;

public class FileServices : IFiles
{
    private readonly AppDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IFolder _folderServices;
    public FileServices(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor, IFolder folderServices)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _folderServices = folderServices;
    }
    public async Task<string> AddFile(IFormFile newFile)
    {
        try
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // var folder = await _folderServices.GetFolderById(newFile.FolderId);
            // if (folder == null)
            // {

            //     return "Folder not found!!!";
            // }
            var neFileUpload = new FileDetails()
            {
                FileName = newFile.FileName,
                UserId = new Guid(userId),
                DateAdded = DateTime.UtcNow
            };

            using (var stream = new MemoryStream())
            {
                newFile.CopyTo(stream);
            }
            _dbContext.Files.Add(neFileUpload);
            await _dbContext.SaveChangesAsync();
            return "File added!!!";
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
    }

    public Task<string> DeleteFile(Guid Id)
    {
        throw new NotImplementedException();
    }

    public Task<List<FileDetails>> GetAllFiles()
    {
        throw new NotImplementedException();
    }

    public async Task<FileDetails> GetFile(Guid Id)
    {
        var file = await _dbContext.Files.Where(k => k.Id == Id).FirstOrDefaultAsync();
        var content = new MemoryStream(file.FileData);
        var path = Path.Combine(Directory.GetCurrentDirectory(), "FileDownloaded",
        file.FileName);
        await CopyStream(content, path);
        return file;
    }

    public async Task CopyStream(Stream stream, string downloadPath)
    {
        using (var fileStream = new FileStream(downloadPath, FileMode.Create, FileAccess.Write))
        {
            await stream.CopyToAsync(fileStream);
        }
    }

    public Task<List<FileDetails>> GetFiles(Guid UserId)
    {
        throw new NotImplementedException();
    }

    public Task<string> UpdateFile(FileDetails updateFile)
    {
        throw new NotImplementedException();
    }
}
