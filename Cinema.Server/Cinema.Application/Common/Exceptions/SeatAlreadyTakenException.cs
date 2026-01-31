using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class SeatsAlreadyTakenException : Exception
    {
        public SeatsAlreadyTakenException()
            : base("One or more selected seats are already purchased or being processed by another user.") { }
    }
}
