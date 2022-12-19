using System.Security.Claims;
using GymApi.Auth;
using GymApi.Dtos;
using GymApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GymApi.Controllers
{
    [Route("api/auth")]
    [AllowAnonymous]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<GymUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(UserManager<GymUser> userManager, IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUser registerUserDto)
        {
            var user = await _userManager.FindByEmailAsync(registerUserDto.Email);
            if (user != null)
            {
                return BadRequest("User already exists.");
            }
            var newUser = new GymUser
            {
                Email = registerUserDto.Email,
                UserName = registerUserDto.Email,
                FirstName = registerUserDto.FirstName,
                LastName = registerUserDto.LastName,
                Age = registerUserDto.Age
            };

            var createdUserResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);

            if (!createdUserResult.Succeeded)
            {
                return BadRequest(createdUserResult.Errors.ToString());
            }

            await _userManager.AddToRoleAsync(newUser, Roles.User);

            return CreatedAtAction(nameof(Register), new SuccessfulRegisterDto(newUser.Id));
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUser loginUserDto)
        {
            var user = await _userManager.FindByEmailAsync(loginUserDto.Email);
            if (user == null)
            {
                return BadRequest("Wrong email or password.");
            }

            bool isPasswordValid = await _userManager.CheckPasswordAsync(user, loginUserDto.Password);

            if (!isPasswordValid)
            {
                return BadRequest("Wrong email or password.");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtTokenService.CreateAccessToken(user.Email, user.Id, roles);

            return Ok(new SuccessfulLoginDto(accessToken, user.MapToDto(), roles));
        }

        [Authorize(Roles = Roles.User)]
        [HttpGet]
        [Route("token-login")]
        public async Task<IActionResult> TokenLogin()
        {
            ClaimsPrincipal currentUser = this.User;
            var userEmail = currentUser.FindFirst(ClaimTypes.Email).Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return BadRequest("Bad token");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtTokenService.CreateAccessToken(user.Email, user.Id, roles);
            return Ok(new SuccessfulLoginDto(accessToken, user.MapToDto(), roles));
        }
    }
}
