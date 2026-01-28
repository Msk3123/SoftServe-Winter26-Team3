using FluentValidation;
using Cinema.Application.DTOs.RoleDtos;

namespace Cinema.Application.Validators.Roles
{
    public class RoleCreateValidator : AbstractValidator<RoleCreateDto>
    {
        public RoleCreateValidator()
        {
            RuleFor(x => x.RoleName)
                .NotEmpty().WithMessage("Role name is required.")
                .MaximumLength(50).WithMessage("Role name cannot exceed 50 characters.");
        }
    }
}