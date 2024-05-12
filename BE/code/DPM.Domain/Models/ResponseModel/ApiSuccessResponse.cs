using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Models.ResponseModel
{
    public class ApiSuccessResponse<T>
    {
        public bool Success { get; set; } = true;

        public string Message { get; set; }

        public T Data { get; set; }

        public Metadata Metadata { get; set; }
    }
    public class Metadata
    {
        public int Offset { get; set; } 

        public int Limit { get; set; }

        public int TotalRecord { get; set; }

        public string Sort { get; set; }

        public bool Asc { get; set; } = false; 

        public object Search { get; set; } 
    }


}
