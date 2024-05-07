using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace FolderService;
[Route("api/[controller]")]
[ApiController]
// [EnableCors("MyPolicy")]

public class FoldersController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IFolder _folderServices;
    private readonly ResponseDto _response;
    public FoldersController(IMapper mapper, IFolder folderServices)
    {
        _mapper = mapper;
        _folderServices = folderServices;
        _response = new ResponseDto();
    }
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ResponseDto>> AddFolder(AddFolderDto newFolder)
    {
        try
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                _response.Error = "Please log in";
                return BadRequest(_response);
            }
            var folder = _mapper.Map<Folder>(newFolder);
            folder.UserId = new Guid(userId);
            var addedFolder = await _folderServices.AddFolder(folder);
            _response.Result = addedFolder;
            return Ok(_response);


        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ResponseDto>> GetFolders()
    {
        try
        {
            var folders = await _folderServices.GetFolders();
            if (folders == null)
            {
                _response.Error = "Folders not found";
                return NotFound(_response);
            }
            _response.Result = folders;
            return Ok(_response);

        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }
    }

    [HttpGet("user_Folders")]
    [Authorize]
    public async Task<ActionResult<ResponseDto>> GetUserFolders()
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

            var folders = await _folderServices.GetUserFolders(UserId);
            if (folders == null)
            {
                _response.Error = "Folders not found";
                return NotFound(_response);
            }
            _response.Result = folders;
            return Ok(_response);

        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }
    }

    [HttpGet("{Id}")]
    [Authorize]
    public async Task<ActionResult<ResponseDto>> GetFolder(Guid Id)
    {
        try
        {
            var folder = await _folderServices.GetFolder(Id);
            if (folder != null)
            {
                _response.Result = folder;
                return Ok(_response);
            }
            _response.Error = "Folder Not found";
            return NotFound(_response);

        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }
    }

    [HttpPut("{Id}")]
    [Authorize]
    public async Task<ActionResult<ResponseDto>> UpdateFolder(Guid Id, AddFolderDto uptFolder)
    {
        try
        {
            var UpdateFolder = await _folderServices.GetFolder(Id);
            if (UpdateFolder != null)
            {
                var updated = _mapper.Map(uptFolder, UpdateFolder);
                var result = await _folderServices.UpdateFolder(updated);
                _response.Result = result;
                return Ok(_response);
            }
            _response.Error = "Update failed!!";
            return BadRequest(_response);



        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }
    }

    [HttpDelete("{Id}")]
    public async Task<ActionResult<ResponseDto>> DeleteFolder(Guid Id)
    {
        try
        {
            var deleteFolder = await _folderServices.DeleteFolder(Id);
            if (deleteFolder != null)
            {
                _response.Result = deleteFolder;
                return Ok(_response);
            }
            _response.Error = "Delete folder failed!!!";
            return BadRequest(_response);

        }
        catch (Exception ex)
        {
            _response.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
            return StatusCode(500, _response);
        }
    }

}
