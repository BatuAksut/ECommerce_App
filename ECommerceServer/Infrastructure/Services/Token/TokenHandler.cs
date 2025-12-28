using Application.Abstractions.Token;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Infrastructure.Services.Token
{
    public class TokenHandler : ITokenHandler
    {
        IConfiguration _configuration;

        public TokenHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Application.DTOs.Token CreateAccessToken(int minute)
        {
            Application.DTOs.Token token = new Application.DTOs.Token();
            
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"]));

            SigningCredentials signingCredentials = new(securityKey,SecurityAlgorithms.HmacSha256);

            token.Expiration = DateTime.Now.AddMinutes(minute);

            JwtSecurityToken jwtSecurityToken = new(
                issuer: _configuration["Token:Issuer"],
                audience: _configuration["Token:Audience"],
                expires: token.Expiration,
                notBefore: DateTime.Now,
                signingCredentials: signingCredentials
                );

            JwtSecurityTokenHandler tokenHandler = new();
            token.AccessToken = tokenHandler.WriteToken(jwtSecurityToken);
            return token;
        }
    }
}
