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
                .NotEmpty().WithMessage("Заголовок не може бути порожнім.")
                .MaximumLength(200).WithMessage("Заголовок не може перевищувати 200 символів.")
                .When(x => x.Title != null);

            RuleFor(x => x.ImageUrl)
                .IsValidUrl().WithMessage("Некоректний формат URL.")
                .When(x => x.ImageUrl != null);

            RuleFor(x => x.TagId)
                .GreaterThan(0).WithMessage("TagId має бути більшим за 0.")
                .When(x => x.TagId.HasValue);

            RuleFor(x => x.MovieId)
                .GreaterThan(0).WithMessage("MovieId має бути більшим за 0.")
                .When(x => x.MovieId.HasValue);

            RuleFor(x => x.ActorId)
                .GreaterThan(0).WithMessage("ActorId має бути більшим за 0.")
                .When(x => x.ActorId.HasValue);
        }
    }
}