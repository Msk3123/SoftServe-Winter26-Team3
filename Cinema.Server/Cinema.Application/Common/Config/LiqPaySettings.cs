using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Common.Config
{
    public class LiqPaySettings
    {
        public string PublicKey { get; set; }
        public string PrivateKey { get; set; }

        public string CallBackServerUrl { get; set; }
        public string ResultUrl { get; set; }
        public string Currency { get; set; }
    }
}
