using Cinema.Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        Task<T?> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task SaveAsync();
        Task DeleteAsync(int id);
        Task<(IEnumerable<T> Items, int TotalCount)> GetPagedAsync(QueryParameters queryParameters);
    }
}
