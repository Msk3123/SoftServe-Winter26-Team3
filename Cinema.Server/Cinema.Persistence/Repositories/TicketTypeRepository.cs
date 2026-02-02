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
    public class TicketTypeRepository : Repository<TicketType>, ITicketTypeRepository
    {
        public TicketTypeRepository(AppDbContext context) : base(context) { }
        public async Task<(IEnumerable<TicketType> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters)
        {
            return await _dbSet
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }
    }
}
