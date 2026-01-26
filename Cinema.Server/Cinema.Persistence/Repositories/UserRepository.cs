using Cinema.Application.Common.Models;
using Cinema.Application.Helpers;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context) { }

        public async Task<(IEnumerable<User> Items, int TotalCount)> GetAllWithRolesPagedAsync(QueryParameters queryParameters)
        {
            return await _dbSet
                .AsNoTracking()
                .Include(u => u.Role)
                .ToPagedResultAsync(queryParameters);
        }

        public async Task<User?> GetByIdWithRoleAsync(int id)
        {
            return await _dbSet
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.UserId == id);
        }
    }
}
