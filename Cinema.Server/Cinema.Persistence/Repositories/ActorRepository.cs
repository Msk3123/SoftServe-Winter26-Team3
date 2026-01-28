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
    public class ActorRepository : Repository<Actor>, IActorRepository
    {
        public ActorRepository(AppDbContext context) : base(context) { }

        public async Task<(IEnumerable<Actor> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters)
        {
            return await _dbSet
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }

        public async Task<Actor?> GetByIdWithMoviesAsync(int id)
        {
            return await _dbSet
                .Include(a => a.ActorMovies)
                    .ThenInclude(am => am.Movie)
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.ActorId == id);
        }
    }
}
