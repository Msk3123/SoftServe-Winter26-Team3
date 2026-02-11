using FluentValidation;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Cinema.API.Filters
{
    public class AsyncValidationFilter : IAsyncActionFilter
    {
        private readonly IServiceProvider _serviceProvider;

        public AsyncValidationFilter(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            foreach (var argument in context.ActionArguments.Values)
            {
                if (argument == null) continue;

                var validatorType = typeof(IValidator<>).MakeGenericType(argument.GetType());
                var validator = _serviceProvider.GetService(validatorType) as IValidator;

                if (validator != null)
                {
                    var validationContext = new ValidationContext<object>(argument);
                    var result = await validator.ValidateAsync(validationContext);

                    if (!result.IsValid)
                    {
                        throw new ValidationException(result.Errors);
                    }
                }
            }
            await next();
        }
    }
}