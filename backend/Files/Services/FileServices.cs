
using Microsoft.EntityFrameworkCore;

namespace Files;

public class FileServices : Ifile
{
    private readonly AppDbContext _dbContext;
   
    private readonly Ifolder _folderServices;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly ResponseDto _response;
    private bool fileinfo;

    public FileServices(AppDbContext dbContext, Ifolder folderServices, IWebHostEnvironment webHostEnvironment)
    {
        _dbContext = dbContext;
       
        _folderServices = folderServices;
        _webHostEnvironment = webHostEnvironment;
        _response = new ResponseDto();
    }
    public async Task<string> AddFile(Files newFile)
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

    public async Task<List<Files>> GetAllFiles()
    {
        return await _dbContext.Files.ToListAsync();
    }

    public async Task<Files> GetFile(Guid Id)
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

    public async Task<List<Files>> GetFiles(Guid UserId)
    {
        return await _dbContext.Files.Where(k => k.UserId == UserId).ToListAsync();
    }

    public Task<string> UpdateFile(Files updateFile)
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

    public async Task<List<Files>> GetFolderFiles(Guid UserId, Guid FolderId)
    {
        return await _dbContext.Files.Where(fileinfo => fileinfo.UserId == UserId && fileinfo.FolderId == FolderId).ToListAsync();
    }

    public async Task<Files> GetFileByName(string Filename)
    {
        return await _dbContext.Files.Where(file => file.FileName == Filename).FirstOrDefaultAsync();
    }
}
