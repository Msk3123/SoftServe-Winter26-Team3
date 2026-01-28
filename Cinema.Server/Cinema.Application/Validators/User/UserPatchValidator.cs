using Cinema.Application.DTOs.UserDtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Validators.User
{
    public class UserPatchDtoValidator : AbstractValidator<UserPatchDto>
    {
        public UserPatchDtoValidator()
        {
            RuleFor(x => x.FirstName)
                .MaximumLength(50).WithMessage("First name is too long")
                .When(x => x.FirstName != null);

            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("Invalid email format")
                .When(x => x.Email != null);

            RuleFor(x => x.Phone)
                .Matches(@"^\+[1-9]\d{6,14}$")
                .WithMessage("Invalid international phone format")
                .When(x => x.Phone != null);

            RuleFor(x => x.RoleId)
                .GreaterThan(0).WithMessage("Invalid RoleId")
                .When(x => x.RoleId != null);
        }
    }
}
