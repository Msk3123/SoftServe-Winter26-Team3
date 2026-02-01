using Cinema.Application.DTOs.HallDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

using Cinema.Application.DTOs.HallDtos;
using FluentValidation;

namespace Cinema.Application.Validators.Hall
{
    public class HallCreateValidator : AbstractValidator<HallCreateDto>
    {
        public HallCreateValidator()
        {
            RuleFor(x => x.HallName)
                .NotEmpty().WithMessage("Hall name is required.")
                .MaximumLength(100).WithMessage("Hall name cannot exceed 100 characters.");

            RuleFor(x => x.Rows)
                .InclusiveBetween(1, 50).WithMessage("Rows must be between 1 and 50.");

            RuleFor(x => x.SeatsPerRow)
                .InclusiveBetween(1, 100).WithMessage("Seats per row must be between 1 and 100.");
        }
    }
}