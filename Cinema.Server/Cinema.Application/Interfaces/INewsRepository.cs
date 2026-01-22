using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface INewsRepository : IRepository<News>
    {
        Task<IEnumerable<News>> GetAllWithDetailsAsync();
        Task<IEnumerable<News>> GetActiveNewsAsync();
        Task<News?> GetByIdWithDetailsAsync(int id);
    }
}
