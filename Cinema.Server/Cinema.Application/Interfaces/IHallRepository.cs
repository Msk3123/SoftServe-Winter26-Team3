using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IHallRepository : IRepository<Hall>
    {
        Task<(IEnumerable<Hall> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters);
    }
}
