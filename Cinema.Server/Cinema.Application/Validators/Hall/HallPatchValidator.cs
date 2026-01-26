using Cinema.Application.DTOs.HallDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Validators.Hall
{
    public class HallPatchValidator : AbstractValidator<HallPatchDto>
    {
        public HallPatchValidator()
        {
            RuleFor(x => x.HallName)
                .NotEmpty().WithMessage("Hall name cannot be empty.")
                .When(x => x.HallName != null);

            RuleFor(x => x.Capacity)
                .GreaterThan(0).WithMessage("Capacity must be greater than 0.")
                .When(x => x.Capacity.HasValue);
        }
    }
}
