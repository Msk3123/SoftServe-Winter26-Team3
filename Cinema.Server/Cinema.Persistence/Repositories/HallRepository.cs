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
    public class HallRepository : Repository<Hall>, IHallRepository
    {
        public HallRepository(AppDbContext context) : base(context) { }

        public async Task<(IEnumerable<Hall> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters)
        {
            return await _dbSet
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }
    }
}
