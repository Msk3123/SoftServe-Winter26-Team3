using Cinema.Application.DTOs.SeatDtos;
using Cinema.Application.Interfaces;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
namespace Cinema.Application.Validators.SeatValidators
{
    public class SeatPatchValidator : AbstractValidator<SeatPatchDto>
    {
        public SeatPatchValidator()
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Row)
                .InclusiveBetween(1, 100)
                .When(x => x.Row.HasValue);

            RuleFor(x => x.SeatNo)
                .InclusiveBetween(1, 1000)
                .When(x => x.SeatNo.HasValue)
                .WithMessage("Seat number must be between 1 and 1000.");

            RuleFor(x => x.SeatTypeId)
                .GreaterThan(0)
                .When(x => x.SeatTypeId.HasValue)
                .WithMessage("Seat type ID must be greater than 0.");

            RuleFor(x => x.HallId)
                .GreaterThan(0)
                .When(x => x.HallId.HasValue)
                .WithMessage("Invalid Hall ID.");
        }
    }
}