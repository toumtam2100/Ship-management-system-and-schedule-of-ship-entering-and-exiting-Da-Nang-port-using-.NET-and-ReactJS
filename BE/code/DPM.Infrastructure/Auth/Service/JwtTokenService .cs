using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Infrastructure.Auth.Service
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly JwtIssuerOptions _jwtIssuerOptions;

        public JwtTokenService(JwtIssuerOptions jwtIssuerOptions)
        {
            _jwtIssuerOptions = jwtIssuerOptions;
        }

        public string GenerateAccessToken(ClaimsIdentity identity)
        {
            var jwt = new JwtSecurityToken(
                issuer: _jwtIssuerOptions.Issuer,
                audience: _jwtIssuerOptions.Issuer,
                claims: identity.Claims,
                notBefore: _jwtIssuerOptions.ValidIssuedAt,
                expires: _jwtIssuerOptions.ValidTo,
                signingCredentials: _jwtIssuerOptions.SigningCredentials
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);

        }
    }
}
