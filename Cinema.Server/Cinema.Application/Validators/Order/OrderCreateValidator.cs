using FluentValidation;
using Cinema.Application.DTOs.OrderDtos;

namespace Cinema.Application.Validators.OrderValidators
{
    public class OrderCreateValidator : AbstractValidator<OrderCreateDto>
    {
        public OrderCreateValidator()
        {
            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("User ID is required")
                .GreaterThan(0).WithMessage("Invalid User ID");

            RuleFor(x => x.SessionId)
                .NotEmpty().WithMessage("Session ID is required")
                .GreaterThan(0).WithMessage("Invalid Session ID");

            RuleFor(x => x.SelectedTickets)
                .NotEmpty().WithMessage("At least one seat must be selected")
                .Must(x => x != null && x.Count > 0).WithMessage("Ticket list cannot be empty");

            RuleForEach(x => x.SelectedTickets).ChildRules(ticket =>
            {
                ticket.RuleFor(t => t.SessionSeatId)
                    .GreaterThan(0).WithMessage("Invalid Session Seat ID");

                ticket.RuleFor(t => t.TicketTypeId)
                    .GreaterThan(0).WithMessage("Invalid Ticket Type ID");
            });
        }
    }
}