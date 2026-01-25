using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Models
{
    public class QueryParameters
    {
        private const int MaxPageSize = 50;
        public int Page { get; set; } = 1;

        private int _pageSize = 10;
        public int Limit
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string SortBy { get; set; } = "Id"; 
        public string Order { get; set; } = "asc"; 
    }
}