using System.Security.Claims;
using AuthService.Models.Dtos;
using AuthService.Services.Iservices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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

        [HttpGet("loggedInUser")]
        [Authorize]
        public async Task<ActionResult<ResponseDto>> GetUser()
        {
            try
            {
                var Token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
                var userId = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    _responseDto.Error = "Please log in";
                    return BadRequest(_responseDto);
                }

                var UserId = Guid.Parse(userId);
                // token = Token;

                var loggedUser = await _userServices.GetUser(UserId, Token);
                if (loggedUser == null)
                {
                    _responseDto.Error = "User is not logged in!!";
                    return BadRequest(_responseDto);
                }
                _responseDto.Result = loggedUser;
                return Ok(_responseDto);

            }
            catch (Exception ex)
            {
                _responseDto.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return StatusCode(500, _responseDto);
            }
        }


        [HttpGet("{UserId}")]
        public async Task<ActionResult<ResponseDto>> GetOneUser(Guid UserId)
        {
            try
            {
                var user = await _userServices.GetOneUser(UserId);
                if (user == null)
                {
                    _responseDto.Error = "User not found";
                    return NotFound(_responseDto);
                }
                _responseDto.Result = user;
                return Ok(_responseDto);

            }
            catch (Exception ex)
            {
                _responseDto.Error = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return StatusCode(500, _responseDto);
            }

        }




        [HttpPost("register")]
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
        [HttpPost("login")]
        public async Task<ActionResult<ResponseDto>> SignInUser(LoginRequestDto loginRequest)
        {
            try
            {
                var response = await _userServices.SignInUser(loginRequest);
                if (response.UserDto != null)
                {
                    _responseDto.Result = response;
                    return Created("", _responseDto);
                }
                _responseDto.Error = "Wrong credentials!!";
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


