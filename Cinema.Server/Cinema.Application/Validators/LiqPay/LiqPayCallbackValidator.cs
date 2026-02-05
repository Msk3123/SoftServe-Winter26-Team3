using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.LiqPayDtos;
using Cinema.Application.DTOs.PaymentDtos;
using FluentValidation;

namespace Cinema.Application.Validators.Payment
{
    public class LiqPayCallbackValidator : AbstractValidator<LiqPayCallback>
    {
        public LiqPayCallbackValidator()
        {
            RuleFor(x => x.Status).NotEmpty().WithMessage("Payment status is missing.");
            RuleFor(x => x.OrderId).NotEmpty().WithMessage("Order identity is missing.");
            RuleFor(x => x.PaymentId).GreaterThan(0).WithMessage("Invalid transaction ID.");
            RuleFor(x => x.Amount).GreaterThan(0).WithMessage("Amount must be greater than zero.");
        }
    }
}