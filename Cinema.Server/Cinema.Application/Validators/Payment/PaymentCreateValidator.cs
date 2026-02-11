using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using Cinema.Application.DTOs.PaymentDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Enums;

namespace Cinema.Application.Validators.Payment
{
    public class PaymentCreateValidator : AbstractValidator<PaymentCreateDto>
    {
        public PaymentCreateValidator(IUnitOfWork unitOfWork)
        {
            // OrderId Validation
            RuleFor(x => x.OrderId)
                .NotEmpty().WithMessage("Order ID is required.")
                .GreaterThan(0).WithMessage("Invalid Order ID.")
                .MustAsync(async (orderId, cancellation) =>
                {
                    var order = await unitOfWork.Orders.GetByIdAsync(orderId);
                    return order != null;
                }).WithMessage("Order with the specified ID was not found.")
                .MustAsync(async (orderId, cancellation) =>
                {
                    var payment = await unitOfWork.Payments.GetByOrderIdAsync(orderId);
                    // Business rule: only allow payment if no completed payment exists for this order
                    return payment == null || payment.PaymentStatus != PaymentStatus.Completed;
                }).WithMessage("This order has already been paid.");

            // PaymentMethod Validation
            RuleFor(x => x.PaymentMethod)
                .IsInEnum().WithMessage("The selected payment method is invalid.");
        }
    }
}