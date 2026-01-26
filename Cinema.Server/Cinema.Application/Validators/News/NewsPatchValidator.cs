using FluentValidation;
using Cinema.Application.DTOs.NewsDtos;
using Cinema.Application.Common.Extensions;

namespace Cinema.Application.Validators.News
{
    public class NewsPatchValidator : AbstractValidator<NewsPatchDto>
    {
        public NewsPatchValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title cannot be empty.")
                .MaximumLength(200).WithMessage("Title cannot exceed 200 characters.")
                .When(x => x.Title != null);

            RuleFor(x => x.NewsContent)
                .NotEmpty().WithMessage("News content cannot be empty.")
                .When(x => x.NewsContent != null);

            RuleFor(x => x.ImageUrl)
                .IsValidUrl().WithMessage("Invalid image URL format.")
                .When(x => x.ImageUrl != null);

            RuleFor(x => x.TagId)
                .GreaterThan(0).WithMessage("TagId must be greater than 0.")
                .When(x => x.TagId.HasValue);

            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("MovieId must be greater than 0.")
                .When(x => x.MovieId.HasValue);

            RuleFor(x => x.ActorId)
                .GreaterThan(0).WithMessage("ActorId must be greater than 0.")
                .When(x => x.ActorId.HasValue);
        }
    }
}