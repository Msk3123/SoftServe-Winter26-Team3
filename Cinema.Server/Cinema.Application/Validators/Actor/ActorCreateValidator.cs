using FluentValidation;
using Cinema.Application.DTOs.ActorDtos;
using Cinema.Application.Common.Extensions;

namespace Cinema.Application.Validators.Actors
{
    public class ActorCreateValidator : AbstractValidator<ActorCreateDto>
    {
        public ActorCreateValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("First name is required.")
                .MaximumLength(100).WithMessage("First name cannot exceed 100 characters.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Last name is required.")
                .MaximumLength(100).WithMessage("Last name cannot exceed 100 characters.");

            RuleFor(x => x.PhotoUrl)
                .NotEmpty().WithMessage("Photo URL is required.")
                .IsValidUrl().WithMessage("Invalid URL format for photo.");

            RuleFor(x => x.Birthday)
                .NotEmpty().WithMessage("Birthday is required.")
                .Must(date => date < DateOnly.FromDateTime(DateTime.Today))
                .WithMessage("Birthday cannot be in the future.");
        }
    }
}