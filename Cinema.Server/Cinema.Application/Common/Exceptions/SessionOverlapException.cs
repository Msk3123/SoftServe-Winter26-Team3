using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class SessionOverlapException : Exception
    {
        public SessionOverlapException(string message) : base(message) { }
    }
}