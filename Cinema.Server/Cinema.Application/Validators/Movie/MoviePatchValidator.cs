using FluentValidation;
using Cinema.Application.DTOs.MovieDtos;

namespace Cinema.Application.Validators.MovieValidators
{
    public class MoviePatchValidator : AbstractValidator<MoviePatchDto>
    {
        public MoviePatchValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title cannot be empty")
                .MaximumLength(200).WithMessage("Title is too long")
                .When(x => x.Title != null);

            RuleFor(x => x.Duration)
                .GreaterThan(0).WithMessage("Duration must be positive")
                .When(x => x.Duration != null);

            RuleFor(x => x.Rating)
                .InclusiveBetween(0, 10).WithMessage("Rating must be between 0.0 and 10.0")
                .When(x => x.Rating != null);

            RuleFor(x => x.PosterUrl)
                .Must(LinkMustBeValid).WithMessage("Invalid Poster URL format")
                .When(x => !string.IsNullOrEmpty(x.PosterUrl));

            RuleFor(x => x.TrailerUrl)
                .Must(LinkMustBeValid).WithMessage("Invalid Trailer URL format")
                .When(x => !string.IsNullOrEmpty(x.TrailerUrl));

            RuleFor(x => x.Language)
                .Length(2).WithMessage("Language code must be exactly 2 characters")
                .When(x => x.Language != null);

            RuleFor(x => x.EndDate)
                .GreaterThan(x => x.StartDate.Value)
                .WithMessage("End date must be after start date")
                .When(x => x.StartDate.HasValue && x.EndDate.HasValue);

            RuleFor(x => x.GenreIds)
                .Must(x => x.Count > 0).WithMessage("At least one genre must be selected if genres are provided")
                .When(x => x.GenreIds != null);
        }

        private bool LinkMustBeValid(string? link)
        {
            if (string.IsNullOrWhiteSpace(link)) return true;
            return Uri.TryCreate(link, UriKind.Absolute, out var outUri)
                   && (outUri.Scheme == Uri.UriSchemeHttp || outUri.Scheme == Uri.UriSchemeHttps);
        }
    }
}