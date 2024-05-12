using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Applications.Services
{
    public interface IAuthenticationService
    {
        Task<string> CreateUserAsync(string email, string username, string? password);
    }
}
