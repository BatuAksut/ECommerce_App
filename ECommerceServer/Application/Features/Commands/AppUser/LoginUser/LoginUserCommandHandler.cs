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

        public LoginUserCommandHandler(
            UserManager<Domain.Entities.Identity.AppUser> userManager,
            SignInManager<Domain.Entities.Identity.AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
         
                return new()
                {
                    IsSuccess = true,
                    Message = "Login successful, auth completed"
                };
            }

            return new() { IsSuccess = false, Message = "Invalid password" };
        }
    }
}
