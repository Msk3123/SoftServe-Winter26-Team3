using System;
using System.Collections.Generic;
using System.Text;


namespace Cinema.Application.Common.Exceptions
{
    public class UnavailableOperationException : Exception
    {
        public UnavailableOperationException(string message)
            : base(message) { }
        
    }
}
