using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Common
{
    public enum ReadConsistency
    {
        Strong,
        Eventual,
        Cached
    }
}
