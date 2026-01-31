using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface ITicketTypeRepository : IRepository<TicketType>
    {
        Task<(IEnumerable<TicketType> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters);
    }
}
