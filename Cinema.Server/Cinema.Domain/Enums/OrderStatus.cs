using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Domain.Enums
{
    public enum OrderStatus
    {
        Created,
        Reserved,
        Confirmed,
        Cancelled,
        Completed,
        Refunded
    }
}
