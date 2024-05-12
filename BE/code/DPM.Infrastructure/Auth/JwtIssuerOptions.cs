using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Infrastructure.Auth
{
    public class JwtIssuerOptions
    {
        public string Issuer { get; set; }
        public int ExpirationInHours { get; set; }
        public DateTime ValidIssuedAt { get; set; } 
        public DateTime ValidTo { get; set; }
        public SigningCredentials SigningCredentials { get; set; }
        public JwtBearerOptions JwtTokenOptions { get; set; }
    }

}
