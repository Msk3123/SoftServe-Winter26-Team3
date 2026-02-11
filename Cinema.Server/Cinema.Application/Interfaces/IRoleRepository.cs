using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IRoleRepository : IRepository<Role>
    {
        Task<(IEnumerable<Role> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters);
        Task<Role?> GetByNameAsync(string name);
    }
}
