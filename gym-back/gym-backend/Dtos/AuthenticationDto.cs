using System.ComponentModel.DataAnnotations;

namespace GymApi.Dtos
{
    public record RegisterUser([Required][EmailAddress] string Email, [Required] string Password, [Required] string FirstName, [Required] string LastName, [Required][Range(12, 150)] int Age);
    public record LoginUser([Required][EmailAddress] string Email, [Required] string Password);
    public record SuccessfulRegisterDto(string Id);
    public record SuccessfulLoginDto(string AccessToken, UserDto User, IList<string>? roles);

}
