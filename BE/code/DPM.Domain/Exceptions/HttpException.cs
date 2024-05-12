using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Exceptions
{
    public abstract class HttpException : Exception
    {
        public int StatusCode { get; set; } = 500;
        public Dictionary<string, object> Args { get; set; }

        public HttpException(string message, int statusCode, Dictionary<string, object> args) : base(message)
        {
            StatusCode = statusCode;
            Args = args;
        }
    }

}
