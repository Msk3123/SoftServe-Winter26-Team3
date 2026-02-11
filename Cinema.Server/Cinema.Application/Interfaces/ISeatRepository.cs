using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface ISeatRepository : IRepository<Seat>
    {
        Task<IEnumerable<Seat>> GetByHallId(int hallId);
        Task<(IEnumerable<Seat> Items, int TotalCount)> GetAllPagedAsync(QueryParameters queryParameters);
        Task<Seat?> GetByIdWithDetailsAsync(int id);
        Task<bool> ExistsAsync(int hallId, int row, int seatNo);
        Task<bool> ExistsForOtherSeatAsync(int seatId, int hallId, int seatNo);
        Task<IEnumerable<Seat>> GetByHallIdAsync(int hallId);
        Task UpdateSeatTypesBulkAsync(int oldTypeId, int newTypeId);
    }
}
