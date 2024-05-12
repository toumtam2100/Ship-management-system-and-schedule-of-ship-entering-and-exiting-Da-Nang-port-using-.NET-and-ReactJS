using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Models.ResponseModel
{
    public class LoginResponseModel
    {
        public UserResponseModel User { get; set; }

        public bool IgnoreSelectionStep { get; set; }

        public string AccessToken { get; set; }
    }
}
