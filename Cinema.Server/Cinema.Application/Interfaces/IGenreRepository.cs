using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IGenreRepository : IRepository<Genre>
    {
        Task<(IEnumerable<Genre> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters);
        Task<(IEnumerable<Genre> items, int TotalCount)> GetByNameAsync(string searchTerm, QueryParameters queryParameters);
    }
}
