using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface INewsRepository : IRepository<News>
    {
        Task<(IEnumerable<News> Items, int TotalCount)> GetAllWithDetailsPagedAsync(QueryParameters queryParameters);
        Task<(IEnumerable<News> Items, int TotalCount)> GetActiveNewsPagedAsync(QueryParameters queryParameters);
        Task<News?> GetByIdWithDetailsAsync(int id);
    }
}
