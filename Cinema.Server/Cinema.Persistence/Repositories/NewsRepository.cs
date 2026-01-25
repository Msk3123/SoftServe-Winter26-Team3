using Cinema.Application.Common.Models;
using Cinema.Application.Helpers;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Persistence.Repositories
{
    public class NewsRepository : Repository<News>, INewsRepository
    {
        public NewsRepository(AppDbContext context) : base(context) { }

        public async Task<(IEnumerable<News> Items, int TotalCount)> GetAllWithDetailsPagedAsync(QueryParameters queryParameters)
        {
            return await _dbSet
                .Include(n => n.Tag)
                .Include(n => n.Movie)
                .Include(n => n.Actor)
                .OrderByDescending(n => n.PublishedDate)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }

        public async Task<(IEnumerable<News> Items, int TotalCount)> GetActiveNewsPagedAsync(QueryParameters queryParameters)
        {
            return await _dbSet
                .Where(n => n.IsActive)
                .Include(n => n.Tag)
                .Include(n => n.Movie)
                .Include(n => n.Actor)
                .OrderByDescending(n => n.PublishedDate)
                .AsNoTracking()
                .ToPagedResultAsync(queryParameters);
        }

        public async Task<News?> GetByIdWithDetailsAsync(int id)
        {
            return await _dbSet
                .Include(n => n.Tag)
                .Include(n => n.Movie)
                .Include(n => n.Actor)
                .FirstOrDefaultAsync(n => n.NewsId == id);
        }
    }
}