﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Domain.Common.Models
{
    public interface IBelongToPortAuthority
    {
        bool isPortAuthority { get; set; }
    }
}
