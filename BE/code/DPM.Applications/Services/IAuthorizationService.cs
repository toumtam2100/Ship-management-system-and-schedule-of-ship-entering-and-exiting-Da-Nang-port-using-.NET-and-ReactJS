using DPM.Domain.Common.Models;
using Role = DPM.Domain.Enums.Role;

namespace DPM.Applications.Services
{
    public interface IAuthorizationService
    {
        void AuthorizeMilitary<T>(long resourceId, params Role[] roles) where T : BaseEntity, IBelongToMilitary;
        void AuthorizePortAuthority<T>(long resourceId, params Role[] roles) where T : BaseEntity, IBelongToPortAuthority;
    }
}
