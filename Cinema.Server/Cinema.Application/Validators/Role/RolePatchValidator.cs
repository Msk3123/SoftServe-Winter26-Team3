using FluentValidation;
using Cinema.Application.DTOs.RoleDtos;

namespace Cinema.Application.Validators.Roles
{
    public class RolePatchValidator : AbstractValidator<RolePatchDto>
    {
        public RolePatchValidator()
        {
            RuleFor(x => x.RoleName)
                .NotEmpty().WithMessage("Role name cannot be empty.")
                .MaximumLength(50).WithMessage("Role name cannot exceed 50 characters.")
                .When(x => x.RoleName != null);
        }
    }
}