using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IActorRepository : IRepository<Actor>
    {
        Task<(IEnumerable<Actor> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters);
        Task<Actor?> GetByIdWithMoviesAsync(int id);
    }
}
