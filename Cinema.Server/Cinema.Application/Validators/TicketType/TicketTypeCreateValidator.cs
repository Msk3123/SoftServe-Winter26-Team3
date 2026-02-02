using Cinema.Application.DTOs.TicketTypeDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Validators.TicketTypeValidators
{
    public class TicketTypeCreateValidator : AbstractValidator<TicketTypeCreateDto>
    {
        public TicketTypeCreateValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Ticket type name is required")
                .MaximumLength(50).WithMessage("Name must not exceed 50 chars");

            RuleFor(x => x.Multiplier)
                .InclusiveBetween(0.1m, 5.0m)
                .WithMessage("Multiplier must be between 0.1 and 5.0")
                .Must(x => decimal.Round(x, 2) == x)
                .WithMessage("Multiplier cannot have more than 2 decimal places (use a dot '.' for decimals).");
        }
    }
}