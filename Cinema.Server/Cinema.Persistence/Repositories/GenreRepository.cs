using Cinema.Application.Common.Models;
using Cinema.Application.Helpers;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Persistence.Repositories
{
    public class GenreRepository : Repository<Genre>, IGenreRepository
    {
        public GenreRepository(AppDbContext context) : base(context) { }

        public async Task<(IEnumerable<Genre> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters)
        {
            return await _dbSet
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }
        public async Task<(IEnumerable<Genre> items, int TotalCount)> GetByNameAsync(string searchTerm, QueryParameters queryParameters)
        {
            return await _dbSet
                .Where(g => g.GenreName.Contains(searchTerm))
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }
    }
}