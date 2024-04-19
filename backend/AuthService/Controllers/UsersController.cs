using AuthService.Models.Dtos;
using AuthService.Services.Iservices;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAppUser _userServices;
        private readonly ResponseDto _responseDto;
        public UsersController(IAppUser userServices)
        {
            _userServices = userServices;
            _responseDto = new ResponseDto();
        }
        [HttpGet]
        public async Task<ActionResult<ResponseDto>> GetUsers()
        {
            try
            {
                var users = await _userServices.GetUsers();
                if (users != null)
                {
                    _responseDto.Result = users;
                    return Ok(_responseDto);
                }
                _responseDto.Error = "Users not found";
                return NotFound(_responseDto);

            }
            catch (Exception ex)
            {
                _responseDto.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return StatusCode(500, _responseDto);
            }
        }


        [HttpPost("Register")]
        public async Task<ActionResult<ResponseDto>> RegisterUser(RegisterUserDto registerUser)
        {
            try
            {
                var response = await _userServices.SignUpUser(registerUser);
                if (string.IsNullOrWhiteSpace(response))
                {
                    _responseDto.Result = "Registration successful!!";

                    return Created("", _responseDto);
                }
                _responseDto.Error = response;
                _responseDto.Success = false;
                return BadRequest(_responseDto);

            }
            catch (Exception ex)
            {
                _responseDto.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return StatusCode(500, _responseDto);
            }
        }

    }
}