using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileService;
[Route("api/[controller]")]
[ApiController]

public class FilesController : ControllerBase
{
    private readonly IMapper _imapper;
    private readonly IFiles _filesServices;
    private readonly IFolder _folderServices;
    private readonly ResponseDto _response;
    public FilesController(IMapper imapper, IFiles filesServices, IFolder folderServices)
    {
        _imapper = imapper;
        _filesServices = filesServices;
        _folderServices = folderServices;
        _response = new ResponseDto();
    }

    [HttpGet]
    public async Task<ActionResult<ResponseDto>> GetAllFiles()
    {
        try
        {
            var files = await _filesServices.GetAllFiles();
            if (files == null)
            {
                _response.Error = "Files not found";
                return NotFound(_response);
            }
            _response.Result = files;
            return Ok(_response);
        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }
    }

    [HttpGet("folder_files/{folderId}")]
    public async Task<ActionResult<ResponseDto>> GetFiles(Guid folderId)
    {
        try
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                _response.Error = "Please log in";
                return BadRequest(_response);
            }

            var UserId = Guid.Parse(userId);
            var files = await _filesServices.GetFolderFiles(UserId, folderId);
            if (files == null)
            {
                _response.Error = "Files not found";
                return NotFound(_response);
            }

            _response.Result = files;
            return Ok(_response);

        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }
    }

    [HttpGet("user_files")]
    public async Task<ActionResult<ResponseDto>> GetUserFiles()
    {
        try
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                _response.Error = "Please log in";
                return BadRequest(_response);
            }

            var UserId = Guid.Parse(userId);

            var files = await _filesServices.GetFiles(UserId);
            if (files == null)
            {
                _response.Error = "Files not found";
                return NotFound(_response);
            }

            _response.Result = files;
            return Ok(_response);

        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }

    }


    [HttpPost("upload/{folderId}"), DisableRequestSizeLimit]
    public async Task<ActionResult<ResponseDto>> FileUpload([FromForm] UploadFileDto fileDto, Guid folderId)
    {
        try
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                _response.Error = "Please log in";
                return BadRequest(_response);
            }
            var folder = await _folderServices.GetFolderById(folderId);
            if (folder == null)
            {
                _response.Error = "Folder not found!!!";
                return NotFound(_response);
            }
            if (fileDto.File == null && fileDto.File.Length == 0)
            {
                _response.Error = "Invalid request";
                return BadRequest(_response);
            }
            var folderName = Path.Combine("Resources", "Files");
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            var fileName = fileDto.File.FileName;
            var format = Path.GetExtension(fileName);
            var fullPath = Path.Combine(filePath, fileName);
            var dbPath = Path.Combine(folderName, fileName);

            var mimeType = GetMimeType(dbPath);
            Console.WriteLine(mimeType);
            Console.WriteLine(fileName);
            Console.WriteLine(fullPath);
            Console.WriteLine(dbPath);

            var newFile = new FileDetails()
            {
                Id = Guid.NewGuid(),
                FilePath = dbPath,
                FileName = fileName,
                Format = mimeType,
                FolderId = folderId,
                UserId = Guid.Parse(userId),
                DateAdded = DateTime.UtcNow
            };



            // fileDto=newFile;
            Console.WriteLine(newFile.Id);
            Console.WriteLine(newFile.FilePath);
            Console.WriteLine(newFile.FolderId);
            Console.WriteLine(newFile.UserId);
            Console.WriteLine(newFile.DateAdded);

            if (System.IO.File.Exists(fullPath))
            {
                _response.Error = "File exists";
                return BadRequest(_response);
            }

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                fileDto.File.CopyTo(stream);
            }
            var result = await _filesServices.AddFile(newFile);
            _response.Result = result;

            return Ok(_response);

        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }

    }

    [HttpGet("{fileId}")]
    public async Task<ActionResult<ResponseDto>> GetFile(Guid fileId)
    {
        try
        {
            var file = await _filesServices.GetFile(fileId);
            if (file != null)
            {
                _response.Result = file;
                return Ok(_response);
            }
            _response.Error = "File not found";
            return NotFound(_response);

        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }
    }

    [HttpGet("/{filename}")]
    public async Task<ActionResult<ResponseDto>> GetFileByName(string filename)
    {
        var file = await _filesServices.GetFileByName(filename);
        if (file == null)
        {
            _response.Error = "File not found";
            return NotFound(_response);
        }
        // var filePath = Path.Combine("Resources", "Files", filename);
        if (!System.IO.File.Exists(file.FilePath))
        {
            return NotFound(_response);
        }

        var mimeType = GetMimeType(file.FilePath);
        Console.WriteLine(mimeType);
        var fileStream = System.IO.File.OpenRead(file.FilePath);
        Console.WriteLine(fileStream);

        // return File(fileStream, mimeType);
        // file.FilePath=File(fileStream,mimeType);
        _response.Result = file;
        return Ok(_response);
    }

    private string GetMimeType(string filePath)
    {
        // You can expand this dictionary to include more file types as needed
        var mimeTypes = new Dictionary<string, string>
        {
            { ".txt", "text/plain" },
            { ".pdf", "application/pdf" },
            { ".doc", "application/msword" },
            { ".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
            { ".xls", "application/vnd.ms-excel" },
            { ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
            { ".png", "image/png" },
            { ".jpg", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".gif", "image/gif" },
            { ".bmp", "image/bmp" },
            { ".mp3", "audio/mpeg" },
            { ".mp4", "video/mp4" },
            { ".avi", "video/x-msvideo" },
            { ".mov", "video/quicktime" }
            // Add more MIME types if necessary
        };

        var extension = Path.GetExtension(filePath).ToLowerInvariant();
        return mimeTypes.ContainsKey(extension) ? mimeTypes[extension] : "application/octet-stream";
    }

    // var newFile = _imapper.Map<FileDetails>(uploadFile);
    //         newFile.UserId = new Guid(userId);
    //         newFile.FolderId = folder.Id;
    //         newFile.DateAdded = DateTime.Now;

}
