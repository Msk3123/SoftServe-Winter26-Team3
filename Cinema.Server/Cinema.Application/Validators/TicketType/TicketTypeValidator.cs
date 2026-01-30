using Cinema.Application.DTOs.TicketTypeDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Validators.TicketTypeValidators
{
    public class TicketTypeValidator : AbstractValidator<TicketTypeDto>
    {
        public TicketTypeValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Ticket type name is required")
                .MaximumLength(50).WithMessage("Ticket type name must not exceed 50 characters");

            RuleFor(x => x.Multiplier)
                .InclusiveBetween(0.1m, 5.0m)
                .WithMessage("Price multiplier must be between 0.1 and 5.0 (e.g., 0.5 for Child or 1.0 for Adult)");
        }
    }
}