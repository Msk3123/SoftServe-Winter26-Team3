using Cinema.Application.Common.Models;
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
            // 1. Валідація SortBy (через рефлексію)
            string sortBy = PropertyExists<T>(queryParams.SortBy)
                            ? queryParams.SortBy
                            : "Id"; // Або логіка з MovieId
            if (!PropertyExists<T>(sortBy))
            {
                string defaultId = typeof(T).Name + "Id"; 
                sortBy = PropertyExists<T>(defaultId) ? defaultId : "MovieId"; 
            }
            string sortDirection = queryParams.Order.ToLower() == "desc" ? "descending" : "ascending";

            // 2. Сортування
            query = query.OrderBy($"{sortBy} {sortDirection}");

            // 3. Рахуємо загальну кількість
            var totalCount = await query.CountAsync();

            // 4. Пагінація
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
    }
}
