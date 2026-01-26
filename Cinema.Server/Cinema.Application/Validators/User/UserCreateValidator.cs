using Cinema.Application.DTOs.UserDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Validators.User
{
    public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
    {
        public UserCreateDtoValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("First name is required")
                .MaximumLength(50).WithMessage("First name cannot exceed 50 characters");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8).WithMessage("Password must be at least 8 characters long")
                .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter")
                .Matches(@"[0-9]").WithMessage("Password must contain at least one digit");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Phone number is required")
                // E.164 Format: +[country code][subscriber number]
                .Matches(@"^\+[1-9]\d{6,14}$")
                .WithMessage("Phone must be in international format (e.g., +1234567890) and contain up to 15 digits");

            RuleFor(x => x.RoleId)
                .GreaterThan(0).WithMessage("A valid RoleId is required");
        }
    }
}
