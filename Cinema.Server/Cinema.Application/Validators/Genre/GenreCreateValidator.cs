using FluentValidation;
using Cinema.Application.DTOs.GenreDtos;

namespace Cinema.Application.Validators.Genres
{
    public class GenreCreateValidator : AbstractValidator<GenreCreateDto>
    {
        public GenreCreateValidator()
        {
            RuleFor(x => x.GenreName)
                .NotEmpty().WithMessage("Genre name is required.")
                .MaximumLength(50).WithMessage("Genre name cannot exceed 50 characters.");
        }
    }
}