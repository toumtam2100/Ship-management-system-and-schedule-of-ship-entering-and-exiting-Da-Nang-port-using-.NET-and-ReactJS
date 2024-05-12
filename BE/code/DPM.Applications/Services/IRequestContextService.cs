using DPM.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Applications.Services
{
    public interface IRequestContextService
    {
        public bool IsAuthenticated { get; }
        public long UserId { get; }
        public string RoleType { get; }
        public string Origin { get; }
        public User User { get; }
        public void SetValue(string key, object value);
        public object? GetValue(string key);
    }

}
