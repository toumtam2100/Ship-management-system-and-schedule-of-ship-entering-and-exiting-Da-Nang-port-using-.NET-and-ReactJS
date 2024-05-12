using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Exceptions
{
    public class UnauthorizedException : HttpException
    {
        public UnauthorizedException() : base("t:Message.Unauthorized", 401, new())
        { }
    }
}
