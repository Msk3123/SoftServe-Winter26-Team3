using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;

namespace Cinema.Application.Interfaces
{
    public interface ITagRepository : IRepository<Tag>
    {
        Task<(IEnumerable<Tag> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters);
    }
}