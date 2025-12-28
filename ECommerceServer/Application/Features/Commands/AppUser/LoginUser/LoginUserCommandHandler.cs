using Application.Abstractions.Token;
using Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResponse>
    {
        readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;
        readonly SignInManager<Domain.Entities.Identity.AppUser> _signInManager;
        readonly ITokenHandler _tokenHandler;

        public LoginUserCommandHandler(
            UserManager<Domain.Entities.Identity.AppUser> userManager, 
            SignInManager<Domain.Entities.Identity.AppUser> signInManager, 
            ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
        }

        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.Username);

            if (user == null)
            {
                return new() { IsSuccess = false, Message = "User not found" };
            }

        
            SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (result.Succeeded)
            {
                Token token = _tokenHandler.CreateAccessToken(15);

                return new()
                {
                    IsSuccess = true,
                    Message = "Login successful, auth completed",
                    Token = token
                };
            }

            return new() { IsSuccess = false, Message = "Invalid password" };
        }
    }
}
