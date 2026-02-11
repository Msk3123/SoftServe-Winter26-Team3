using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class SeatAlreadySoldException : Exception
    {
        public SeatAlreadySoldException()
            : base("One or more selected seats are already sold.") { }
    }
}
