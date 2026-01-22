using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface ISessionRepository : IRepository<Session>
    {
        Task<IEnumerable<Session>> GetAllWithDetailsAsync();
        Task<IEnumerable<Session>> GetByMovieIdAsync(int movieId);
        Task<Session?> GetByIdWithFullDetailsAsync(int id);
        Task<Session?> GetWithDetailsAsync(int id);
    }
}
