using FluentValidation;
using Cinema.Application.DTOs.NewsDtos;
using Cinema.Application.Common.Extensions;

namespace Cinema.Application.Validators.News
{
    public class NewsCreateValidator : AbstractValidator<NewsCreateDto>
    {
        public NewsCreateValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("News title is required.")
                .MaximumLength(200).WithMessage("Title cannot exceed 200 characters.");

            RuleFor(x => x.NewsContent)
                .NotEmpty().WithMessage("News content is required.");

            RuleFor(x => x.ImageUrl)
                .NotEmpty().WithMessage("Image URL is required.")
                .IsValidUrl().WithMessage("Invalid image URL format.");

            RuleFor(x => x.PublishedDate)
                .NotEmpty().WithMessage("Publication date is required.")
                .Must(date => date.Date >= DateTime.Today)
                .WithMessage("Publication date cannot be in the past.");

            RuleFor(x => x.TagId)
                .GreaterThan(0).WithMessage("TagId must be greater than 0.");

            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("MovieId must be greater than 0.")
                .When(x => x.MovieId.HasValue);

            RuleFor(x => x.ActorId)
                .GreaterThan(0).WithMessage("ActorId must be greater than 0.")
                .When(x => x.ActorId.HasValue);
        }
    }
}