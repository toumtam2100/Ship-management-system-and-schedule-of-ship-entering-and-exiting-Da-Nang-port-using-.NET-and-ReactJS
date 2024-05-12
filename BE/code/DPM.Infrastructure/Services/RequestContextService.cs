using Autofac;
using DPM.Applications.Services;
using DPM.Domain.Common;
using DPM.Domain.Entities;
using DPM.Domain.Exceptions;
using DPM.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DPM.Infrastructure.Services
{
    internal class RequestContextService : IRequestContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILifetimeScope _parentScope;
        public RequestContextService(IHttpContextAccessor httpContextAccessor, ILifetimeScope parentScope)
        {
            _httpContextAccessor = httpContextAccessor;
            _parentScope = parentScope;
        }

        public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
        public long UserId => IsAuthenticated
          ? long.Parse(_httpContextAccessor.HttpContext?.User.FindFirstValue("user_id")!)
          : throw new UnauthorizedException();
        public string RoleType => IsAuthenticated
          ? _httpContextAccessor.HttpContext?.User.FindFirstValue("role_type")!
          : throw new UnauthorizedException();
        public string Origin => GetOrigin();
        public User User => GetUser();

        public string GetOrigin()
        {
            if (_httpContextAccessor?.HttpContext?.Request.Headers.TryGetValue("Custom-Origin", out var origin) ?? false)
            {
                return origin.FirstOrDefault() ?? "";
            }

            return _httpContextAccessor?.HttpContext?.Request.Headers.Origin.FirstOrDefault() ?? "";
        }

        public User GetUser()
        {
            var context = _httpContextAccessor.HttpContext
              ?? throw new InvalidOperationException("HttpContext is null");
            var userId = UserId;

            using var scope = _parentScope.BeginLifetimeScope();
            var repository = scope.Resolve<IUserRepository>();
            var user = repository
              .GetAll(ReadConsistency.Cached)
              .FirstOrDefault(o => o.Id == UserId)
              ?? throw new UnauthorizedException();

            if (user.IsDisabled)
            {
                throw new LockedException();
            }

            return (User)(context.Items["User"] = user);
        }



        public void SetValue(string key, object value)
        {
            _httpContextAccessor.HttpContext?.Items.Add(key, value);
        }

        public object? GetValue(string key)
        {
            return _httpContextAccessor.HttpContext?.Items[key];
        }
    }

}
