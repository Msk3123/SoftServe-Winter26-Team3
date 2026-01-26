using FluentValidation;
using Cinema.Application.DTOs.SessionDtos;

namespace Cinema.Application.Validators.Sessions
{
    public class SessionCreateValidator : AbstractValidator<SessionCreateDto>
    {
        public SessionCreateValidator()
        {
            RuleFor(x => x.MovieId)
                .GreaterThan(0)
                .WithMessage("MovieId must be greater than 0.");

            RuleFor(x => x.HallId)
                .GreaterThan(0)
                .WithMessage("HallId must be greater than 0.");

            RuleFor(x => x.SessionDate)
                .NotEmpty().WithMessage("Session date is required.")
                .Must(date => date.Date >= DateTime.Today)
                .WithMessage("Session date cannot be in the past.");

            RuleFor(x => x.SessionTime)
                .NotEmpty().WithMessage("Session time is required.");
        }
    }
}