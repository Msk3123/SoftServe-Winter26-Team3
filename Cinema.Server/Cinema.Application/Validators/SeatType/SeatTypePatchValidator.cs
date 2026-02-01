using Cinema.Application.DTOs.SeatTypeDtos;
using FluentValidation;

namespace Cinema.Application.Validators.SeatTypeValidators
{
    public class SeatTypePatchValidator : AbstractValidator<SeatTypePatchDto>
    {
        public SeatTypePatchValidator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(50).WithMessage("Name must not exceed 50 chars")
                .When(x => !string.IsNullOrEmpty(x.Name));

            When(x => x.BasePrice.HasValue, () =>
            {
                RuleFor(x => x.BasePrice.Value)
                    .GreaterThan(0).WithMessage("Base price must be greater than 0")
                    .LessThan(10000).WithMessage("Price seems too high")
                    .Must(x => decimal.Round(x, 2) == x)
                    .WithMessage("Price format is incorrect (max 2 decimal places).");
            });
        }
    }
}