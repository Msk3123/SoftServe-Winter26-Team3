using Cinema.Application.DTOs.SeatTypeDtos;
using FluentValidation;

namespace Cinema.Application.Validators.SeatTypeValidators
{
    public class SeatTypeCreateValidator : AbstractValidator<SeatTypeCreateDto>
    {
        public SeatTypeCreateValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Seat type name is required")
                .MaximumLength(50).WithMessage("Name must not exceed 50 chars");

            RuleFor(x => x.BasePrice)
                .GreaterThan(0).WithMessage("Base price must be greater than 0")
                .LessThan(10000).WithMessage("Price seems too high")
                .Must(x => decimal.Round(x, 2) == x)
                .WithMessage("Price cannot have more than 2 decimal places (use a dot '.' for decimals).");
        }
    }
}