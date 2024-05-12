using DPM.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Models.ResponseModel
{
    public class UserResponseModel
    {
        public string Email { get; set; } = default!;
        public string Username { get; set; } = default!;
        public string? FullName { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public Gender? Gender { get; set; }
        public string? Avatar { get; set; }
        public RoleType RoleType { get; set; } = default!;
    }
}
