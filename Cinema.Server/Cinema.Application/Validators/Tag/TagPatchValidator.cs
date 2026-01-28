using FluentValidation;
using Cinema.Application.DTOs.TagDtos;

namespace Cinema.Application.Validators.Tags
{
    public class TagPatchValidator : AbstractValidator<TagPatchDto>
    {
        public TagPatchValidator()
        {
            RuleFor(x => x.TagName)
                .NotEmpty().WithMessage("Tag name cannot be empty.")
                .MaximumLength(50).WithMessage("Tag name cannot exceed 50 characters.")
                .When(x => x.TagName != null);
        }
    }
}