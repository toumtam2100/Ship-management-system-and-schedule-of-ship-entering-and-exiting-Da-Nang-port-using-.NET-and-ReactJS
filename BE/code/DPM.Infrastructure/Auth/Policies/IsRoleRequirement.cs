using DPM.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace DPM.Infrastructure.Auth.Policies
{
    internal class IsRoleRequirement : IAuthorizationRequirement
    {
        public Role[] Roles { get; }

        public IsRoleRequirement(params Role[] roles)
        {
            Roles = roles;
        }
    }
}
