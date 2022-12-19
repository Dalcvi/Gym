using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;

namespace GymApi.Auth
{
    public class ResourceOwnerAuthorizationHandler : AuthorizationHandler<ResourceOwnerRequirement, IUserOwnedResource>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ResourceOwnerRequirement requirement,
    IUserOwnedResource resource)
        {
            var id = context.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            
            if (context.User.IsInRole(Roles.Admin) ||
                id == resource.UserId ||
                id == resource.ClientId ||
                id == resource.TrainerId)

            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public record ResourceOwnerRequirement : IAuthorizationRequirement;
}
