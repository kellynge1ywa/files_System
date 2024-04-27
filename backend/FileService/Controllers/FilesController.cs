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
    [HttpPost("{folderId}")]
    [Authorize]
    public async Task<ActionResult<ResponseDto>> UploadFile([FromForm] UploadFileDto uploadFile, Guid folderId)
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



            var response = await _filesServices.AddFile(uploadFile.File);
            _response.Result = response;
            return Created("", _response);

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
