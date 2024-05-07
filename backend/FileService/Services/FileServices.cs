
using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace FileService;

public class FileServices : IFiles
{
    private readonly AppDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IFolder _folderServices;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ResponseDto _response;
    public FileServices(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor, IFolder folderServices, IWebHostEnvironment webHostEnvironment)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
        _folderServices = folderServices;
        _webHostEnvironment = webHostEnvironment;
        _response = new ResponseDto();
    }
    public async Task<string> AddFile(FileDetails newFile)
    {
        try
        {
            _dbContext.Files.Add(newFile);
            await _dbContext.SaveChangesAsync();
            return "File uploaded";



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

    public async Task<List<FileDetails>> GetAllFiles()
    {
        return await _dbContext.Files.ToListAsync();
    }

    public async Task<FileDetails> GetFile(Guid Id)
    {
        var file = await _dbContext.Files.Where(k => k.Id == Id).FirstOrDefaultAsync();
        // var content = new MemoryStream(file.FileData);
        // var path = Path.Combine(Directory.GetCurrentDirectory(), "FileDownloaded",
        // file.FileName);
        // await CopyStream(content, path);
        return file;
    }

    public async Task CopyStream(Stream stream, string downloadPath)
    {
        using (var fileStream = new FileStream(downloadPath, FileMode.Create, FileAccess.Write))
        {
            await stream.CopyToAsync(fileStream);
        }
    }

    public async Task<List<FileDetails>> GetFiles(Guid UserId)
    {
        return await _dbContext.Files.Where(k => k.UserId == UserId).ToListAsync();
    }

    public Task<string> UpdateFile(FileDetails updateFile)
    {
        throw new NotImplementedException();
    }

    public async Task SaveFile(UploadFileDto uploadFile)
    {
        var UniqueFileName = Helpers.GetUniqueName(uploadFile.File.FileName);
        // var uploads = Path.Combine(_webHostEnvironment.WebRootPath, "Folders", "Files", uploadFile.UserId.ToString());
        // var filePath = Path.Combine(uploads, UniqueFileName);
        // Directory.CreateDirectory(Path.GetDirectoryName(filePath));
        // await uploadFile.File.CopyToAsync(new FileStream(filePath, FileMode.Create));
        // uploadFile.FilePath = filePath;
        return;
    }
}
