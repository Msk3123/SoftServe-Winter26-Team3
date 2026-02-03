using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class InvalidBatchPeriodException : Exception
    {
        public InvalidBatchPeriodException()
            : base("The specified batch period is invalid, there is able 31 days to create shedule on")
        {
        }
    }
}
