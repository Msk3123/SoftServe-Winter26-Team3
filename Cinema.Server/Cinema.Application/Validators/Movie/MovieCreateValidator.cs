using FluentValidation;
using Cinema.Application.DTOs.MovieDtos;
using Cinema.Application.Common.Extensions;

namespace Cinema.Application.Validators.MovieValidators
{
    public class MovieCreateValidator : AbstractValidator<MovieCreateDto>
    {
        public MovieCreateValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(200).WithMessage("Title is too long");

            RuleFor(x => x.Duration)
                .GreaterThan(0).WithMessage("Duration must be positive");

            RuleFor(x => x.Rating)
                .InclusiveBetween(0, 10).WithMessage("Rating must be between 0.0 and 10.0");

            RuleFor(x => x.PosterUrl)
                .IsValidUrl()
                .WithMessage("Invalid Poster URL format");

            RuleFor(x => x.TrailerUrl)
                .IsValidUrl()
                .WithMessage("Invalid Trailer URL format");

            RuleFor(x => x.Language)
                .Length(2).WithMessage("Language code must be exactly 2 characters (en, fr, ua etc.)");

            RuleFor(x => x.StartDate)
                .LessThan(x => x.EndDate).WithMessage("Start date must be before end date");

            RuleFor(x => x.GenreIds)
                .NotEmpty().WithMessage("At least one genre is required")
                .Must(x => x != null && x.Count > 0).WithMessage("At least one genre must be selected");

            RuleFor(x => x.ActorIds)
                .NotEmpty().WithMessage("At least one actor is required")
                .Must(x => x != null && x.Count > 0).WithMessage("At least one actor must be selected");
        }

        
    }
}