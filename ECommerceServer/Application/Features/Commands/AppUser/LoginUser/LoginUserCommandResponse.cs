using Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public Token? Token { get; set; }
    }
}
