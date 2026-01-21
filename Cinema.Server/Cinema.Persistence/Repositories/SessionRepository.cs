using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.Repositories
{
    public class SessionRepository : Repository<Session>, ISessionRepository
    {
        public SessionRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<Session>> GetAllWithDetailsAsync()
        {
            return await _dbSet
                .Include(s => s.Hall)
                .Include(s => s.Movie)
                    .ThenInclude(m => m.ActorMovies) 
                        .ThenInclude(am => am.Actor) 
                .Include(s => s.Movie)
                    .ThenInclude(m => m.GenreMovies) 
                        .ThenInclude(gm => gm.Genre) 
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<Session>> GetByMovieIdAsync(int movieId)
        {
            return await _dbSet
                .Where(s => s.MovieId == movieId)
                .Include(s => s.Hall)
                .ToListAsync();
        }
        public async Task<Session?> GetByIdWithFullDetailsAsync(int id)
        {
            return await _dbSet
                .Include(s => s.Hall)
                .Include(s => s.Movie)
                    .ThenInclude(m => m.ActorMovies)
                        .ThenInclude(am => am.Actor)
                .Include(s => s.Movie)
                    .ThenInclude(m => m.GenreMovies)
                        .ThenInclude(gm => gm.Genre)
                .AsNoTracking() 
                .FirstOrDefaultAsync(s => s.SessionId == id);
        }
        public async Task<Session?> GetWithDetailsAsync(int id)
        {
            return await _context.Sessions
                .Include(s => s.Movie)
                .Include(s => s.Hall)
                .FirstOrDefaultAsync(s => s.SessionId == id);
        }
    }
}