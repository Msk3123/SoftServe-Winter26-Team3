using FluentValidation;
using Cinema.Application.DTOs.ActorDtos;
using Cinema.Application.Common.Extensions;

namespace Cinema.Application.Validators.Actors
{
    public class ActorPatchValidator : AbstractValidator<ActorPatchDto>
    {
        public ActorPatchValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("First name cannot be empty.")
                .When(x => x.FirstName != null);

            RuleFor(x => x.PhotoUrl)
                .IsValidUrl().WithMessage("Invalid URL format.")
                .When(x => x.PhotoUrl != null);
        }
    }
}