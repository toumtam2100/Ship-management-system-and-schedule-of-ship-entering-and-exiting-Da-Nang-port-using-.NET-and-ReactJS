using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Infrastructure.Auth.Service
{
    public interface IJwtTokenService
    {
        string GenerateAccessToken(ClaimsIdentity identity);
        string GenerateRefreshToken();
    }
}
