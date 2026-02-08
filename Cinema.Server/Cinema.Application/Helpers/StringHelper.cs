using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Helpers
{
    public class StringHelper
    {
        public static string GetSafeSubstring(string text, int maxLength)
        {
            if (string.IsNullOrWhiteSpace(text)) return string.Empty;
            if (text.Length <= maxLength) return text;

            var lastSpaceIndex = text.LastIndexOf(' ', maxLength);

            return lastSpaceIndex > 0
                ? text.Substring(0, lastSpaceIndex) + "..."
                : text.Substring(0, maxLength) + "...";
        }
    }
}
