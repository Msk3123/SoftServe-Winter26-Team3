using FluentValidation;
using Cinema.Application.DTOs.GenreDtos;

namespace Cinema.Application.Validators.Genres
{
    public class GenrePatchValidator : AbstractValidator<GenrePatchDto>
    {
        public GenrePatchValidator()
        {
            RuleFor(x => x.GenreName)
                .NotEmpty().WithMessage("Genre name cannot be empty.")
                .MaximumLength(50).WithMessage("Genre name cannot exceed 50 characters.")
                .When(x => x.GenreName != null);
        }
    }
}