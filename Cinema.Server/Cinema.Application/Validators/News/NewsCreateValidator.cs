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
                .NotEmpty().WithMessage("Заголовок новини обов'язковий.")
                .MaximumLength(200).WithMessage("Заголовок не може перевищувати 200 символів.");

            RuleFor(x => x.NewsContent)
                .NotEmpty().WithMessage("Контент новини не може бути порожнім.");

            RuleFor(x => x.ImageUrl)
                .NotEmpty().WithMessage("Посилання на зображення обов'язкове.")
                .IsValidUrl().WithMessage("Некоректний формат URL для зображення.");

            RuleFor(x => x.PublishedDate)
                .NotEmpty().WithMessage("Дата публікації обов'язкова.")
                .Must(date => date.Date >= DateTime.Today)
                .WithMessage("Дата публікації не може бути в минулому.");

            RuleFor(x => x.TagId)
                .GreaterThan(0).WithMessage("TagId має бути більшим за 0.");

            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("MovieId має бути більшим за 0.")
                .When(x => x.MovieId.HasValue);

            RuleFor(x => x.ActorId)
                .GreaterThan(0).WithMessage("ActorId має бути більшим за 0.")
                .When(x => x.ActorId.HasValue);
        }
    }
}