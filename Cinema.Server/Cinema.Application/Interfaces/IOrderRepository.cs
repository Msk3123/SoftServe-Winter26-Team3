using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<(IEnumerable<Order> Items, int TotalCount)> GetByUserIdPagedAsync(int userId, QueryParameters queryParameters);
    }
}