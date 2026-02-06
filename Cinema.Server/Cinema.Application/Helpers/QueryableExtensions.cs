using Cinema.Application.Common.Models;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Text;

namespace Cinema.Application.Helpers
{
    public static class QueryableExtensions
    {
        public static async Task<(IEnumerable<T> Items, int TotalCount)> ToPagedResultAsync<T>(
            this IQueryable<T> query,
            QueryParameters queryParams)
        {
            string sortBy = PropertyExists<T>(queryParams.SortBy)
                            ? queryParams.SortBy
                            : "Id"; 
            if (!PropertyExists<T>(sortBy))
            {
                string defaultId = typeof(T).Name + "Id"; 
                sortBy = PropertyExists<T>(defaultId) ? defaultId : "MovieId"; 
            }
            string sortDirection = queryParams.Order.ToLower() == "desc" ? "descending" : "ascending";

            query = query.OrderBy($"{sortBy} {sortDirection}");

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((queryParams.Page - 1) * queryParams.Limit)
                .Take(queryParams.Limit)
                .ToListAsync();

            return (items, totalCount);
        }

        private static bool PropertyExists<T>(string propertyName)
        {
            if (string.IsNullOrWhiteSpace(propertyName)) return false;
            return typeof(T).GetProperty(propertyName,
                BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance) != null;
        }
        public static IQueryable<Session> ApplyTimeFilter(this IQueryable<Session> query, SessionFilter filter)
        {
            var now = DateTime.UtcNow;

            return filter switch
            {
                SessionFilter.Active => query.Where(s => s.SessionDate.Date + s.SessionTime > now),
                SessionFilter.Past => query.Where(s => s.SessionDate.Date + s.SessionTime <= now),
                _ => query
            };
        }
    }
}
