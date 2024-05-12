using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Exceptions
{
    public class BadRequestException : HttpException
    {
        public BadRequestException(string code) : base(code, 400, new())
        { }
        public BadRequestException(string code, Dictionary<string, object> args) : base(code, 400, args)
        { }
    }
}
