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
            var fullPath = Path.Combine(filePath, fileName);
            var dbPath = Path.Combine(folderName, fileName);
            Console.WriteLine(fileName);
            Console.WriteLine(fullPath);
            Console.WriteLine(dbPath);

            var newFile = new FileDetails()
            {
                Id = Guid.NewGuid(),
                FilePath = dbPath,
                FolderId = folderId,
                UserId = Guid.Parse(userId),
                DateAdded = DateTime.Now
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

    // var newFile = _imapper.Map<FileDetails>(uploadFile);
    //         newFile.UserId = new Guid(userId);
    //         newFile.FolderId = folder.Id;
    //         newFile.DateAdded = DateTime.Now;

}
