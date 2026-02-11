using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<(IEnumerable<User> Items, int TotalCount)> GetAllWithRolesPagedAsync(QueryParameters queryParameters);
        Task<User?> GetByIdWithRoleAsync(int id);
        Task<User?> GetByEmailAsync(string email);
        Task UpdateAsync(User user);
        Task<bool> SaveChangesAsync();
    }
}
