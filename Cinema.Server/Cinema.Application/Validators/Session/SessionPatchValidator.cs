using FluentValidation;
using Cinema.Application.DTOs.SessionDtos;

namespace Cinema.Application.Validators.Sessions
{
    public class SessionPatchValidator : AbstractValidator<SessionPatchDto>
    {
        public SessionPatchValidator()
        {
            RuleFor(x => x.MovieId)
                .GreaterThan(0)
                .WithMessage("MovieId must be greater than 0.")
                .When(x => x.MovieId.HasValue);

            RuleFor(x => x.HallId)
                .GreaterThan(0)
                .WithMessage("HallId must be greater than 0.")
                .When(x => x.HallId.HasValue);

            RuleFor(x => x.SessionDate)
                .Must(date => date.Value.Date >= DateTime.Today)
                .WithMessage("Session date cannot be in the past.")
                .When(x => x.SessionDate.HasValue);
        }
    }

}