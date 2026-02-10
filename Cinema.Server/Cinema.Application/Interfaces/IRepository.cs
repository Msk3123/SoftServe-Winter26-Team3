using Cinema.Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
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
        void Remove(T entity);
        Task<int> CountAsync(Expression<Func<T, bool>> predicate);
        Task<bool> ExistsAsync(int typeIdToDelete);
        Task RemoveRange(IEnumerable<T> entities);
    }
}
