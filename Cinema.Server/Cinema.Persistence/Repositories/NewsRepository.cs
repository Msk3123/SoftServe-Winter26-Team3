using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.Repositories
{
    public class NewsRepository : Repository<News>, INewsRepository
    {
        public NewsRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<News>> GetAllWithDetailsAsync()
        {
            return await _dbSet
                .Include(n => n.Tag)
                .Include(n => n.Movie)
                .Include(n => n.Actor)
                .OrderByDescending(n => n.PublishedDate) 
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<News>> GetActiveNewsAsync()
        {
            return await _dbSet
                .Where(n => n.IsActive) 
                .Include(n => n.Tag)
                .Include(n => n.Movie)
                .OrderByDescending(n => n.PublishedDate)
                .AsNoTracking()
                .ToListAsync();
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
