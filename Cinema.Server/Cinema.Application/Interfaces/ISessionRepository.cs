using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface ISessionRepository : IRepository<Session>
    {
        Task<(IEnumerable<Session> Items, int TotalCount)> GetAllWithDetailsPagedAsync(QueryParameters queryParameters, SessionFilter timeFilter);
        Task<(IEnumerable<Session> Items, int TotalCount)> GetByMovieIdPagedAsync(int movieId, QueryParameters queryParameters);
        Task<Session?> GetByIdWithFullDetailsAsync(int id);
        Task<Session?> GetWithDetailsAsync(int id);
        Task<IEnumerable<Session>> GetSessionsByDateRangeAsync(int hallId, DateTime startDate, DateTime endDate);
        Task<bool> AnyByHallIdAsync(int hallId);
        Task<IEnumerable<Session>> GetByMovieId(int movieId);
    }
}
