using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Exceptions
{
    public class InvalidPaymentSignatureException : Exception
    {
        public InvalidPaymentSignatureException()
            : base("Security error: Payment signature mismatch. Potential data tampering detected.")
        {
        }
    }
}
