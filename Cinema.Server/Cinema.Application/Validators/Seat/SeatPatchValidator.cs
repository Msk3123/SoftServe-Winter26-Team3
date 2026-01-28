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
        public SeatPatchValidator(ISeatRepository repository)
        {
            // Не забуваємо про каскадний режим
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.SeatNo)
                .InclusiveBetween(1, 1000)
                .When(x => x.SeatNo.HasValue)
                .WithMessage("Seat number must be between 1 and 1000.");

            RuleFor(x => x.SeatType)
                .GreaterThan(0)
                .When(x => x.SeatType.HasValue)
                .WithMessage("Seat type must be greater than 0.");

            RuleFor(x => x.HallId)
                .GreaterThan(0)
                .When(x => x.HallId.HasValue)
                .WithMessage("Invalid Hall ID.");
        }
    }
}