using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class SessionMismatchException : Exception
    {
        public SessionMismatchException()
            : base("Some selected seats do not belong to this session.")
        {
        }
    }
}