using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using Cinema.Application.Common.Models;

namespace Cinema.Application.Validators
{
    public class QueryParametersValidator : AbstractValidator<QueryParameters>
    {
        public QueryParametersValidator()
        {
            RuleFor(x => x.Page)
                .GreaterThanOrEqualTo(1)
                .WithMessage("Page number must be at least 1.");

            RuleFor(x => x.Limit)
                .InclusiveBetween(1, 50)
                .WithMessage("Limit must be between 1 and 50.");

            RuleFor(x => x.Order.ToLower())
                .Must(x => x == "asc" || x == "desc")
                .WithMessage("Order must be either 'asc' or 'desc'.");
        }
    }
}