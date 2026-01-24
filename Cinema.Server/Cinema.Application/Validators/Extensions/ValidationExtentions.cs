using FluentValidation;

namespace Cinema.Application.Common.Extensions
{
    public static class ValidationExtensions
    {
        public static IRuleBuilderOptions<T, string?> IsValidUrl<T>(this IRuleBuilder<T, string?> ruleBuilder)
        {
            return ruleBuilder.Must(link =>
            {
                if (string.IsNullOrWhiteSpace(link)) return true;

                return Uri.TryCreate(link, UriKind.Absolute, out var outUri)
                       && (outUri.Scheme == Uri.UriSchemeHttp || outUri.Scheme == Uri.UriSchemeHttps);
            });
        }
    }
}