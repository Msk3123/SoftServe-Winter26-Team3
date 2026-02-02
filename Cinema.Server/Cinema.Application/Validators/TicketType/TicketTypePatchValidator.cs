using Cinema.Application.DTOs.TicketTypeDtos;
using FluentValidation;

namespace Cinema.Application.Validators.TicketTypeValidators
{
    public class TicketTypePatchValidator : AbstractValidator<TicketTypePatchDto>
    {
        public TicketTypePatchValidator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(50).WithMessage("Name must not exceed 50 chars")
                .When(x => !string.IsNullOrEmpty(x.Name));

            When(x => x.Multiplier.HasValue, () =>
            {
                RuleFor(x => x.Multiplier.Value)
                    .InclusiveBetween(0.1m, 5.0m)
                    .WithMessage("Multiplier must be between 0.1 and 5.0")
                    .Must(x => decimal.Round(x, 2) == x)
                    .WithMessage("Multiplier format is incorrect (max 2 decimal places).");
            });
        }
    }
}