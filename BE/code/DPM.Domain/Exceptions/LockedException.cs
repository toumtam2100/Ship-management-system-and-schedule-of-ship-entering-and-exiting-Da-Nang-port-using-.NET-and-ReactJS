using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Exceptions
{
    public class LockedException : HttpException
    {
        public LockedException() : base("t:Message.Locked", 423, new())
        { }
    }
}
