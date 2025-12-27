using Application.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.AppUser.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, CreateUserCommandResponse>
    {
        readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;

        public CreateUserCommandHandler(UserManager<Domain.Entities.Identity.AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
            IdentityResult result = await _userManager.CreateAsync(new()
            {
                Id = Guid.NewGuid().ToString(),
                FullName = request.FullName,
                UserName = request.Username,
                Email = request.Email,
            }, request.Password);

            if (result.Succeeded)
            {
                return new()
                {
                    IsSuccess = true,
                    Message = "User created successfully."
                };
            }
            return new()
            {
                IsSuccess = false,
                Message = "User creation failed.",
                Errors = result.Errors.Select(e => e.Description)
            };
        }
    }
}
