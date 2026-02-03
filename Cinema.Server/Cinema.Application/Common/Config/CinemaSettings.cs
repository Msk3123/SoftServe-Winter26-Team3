using System;
using System.Collections.Generic;
using System.Text;


    namespace Cinema.Application.Common.Configurations
    {
        public class CinemaSettings 
        {
            public int MaxBatchDays { get; set; }
            public int CleaningDurationMinutes { get; set; }
            public int OrderExpirationMinutes { get; set; }
            public int SessionSeatLockExpirationMinutes { get; set; }
            public int RefundDeadlineMinutes { get; set; }
            public int StopSalesBeforeSessionMinutes { get; set; }
        }
    }
