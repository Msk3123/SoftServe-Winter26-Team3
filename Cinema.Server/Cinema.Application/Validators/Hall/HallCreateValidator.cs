using Cinema.Application.DTOs.HallDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Validators.Hall
{
    public class HallCreateValidator : AbstractValidator<HallCreateDto>
    {
        public HallCreateValidator()
        {
            RuleFor(x => x.HallName)
                .NotEmpty().WithMessage("Hall name is required.")
                .MaximumLength(100).WithMessage("Hall name cannot exceed 100 characters.");

            RuleFor(x => x.Capacity)
                .GreaterThan(0).WithMessage("Capacity must be greater than 0.");
        }
    }
}
