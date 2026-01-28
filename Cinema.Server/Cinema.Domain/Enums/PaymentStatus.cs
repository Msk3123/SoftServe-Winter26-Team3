using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Domain.Enums
{
    public enum PaymentStatus
    {
        Pending,
        Completed,
        Failed,
        Refunded,
        Cancelled
    }
}
