using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Exceptions
{
    public class NotFoundException : HttpException
    {
        public NotFoundException(string name) : base("t:Message.NotFound", 404, new() { { "name", $"t:Subject.{name}" }, })
        { }
    }
}
