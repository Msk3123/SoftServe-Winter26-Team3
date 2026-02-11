using Cinema.Application.DTOs.SeatDtos;
using Cinema.Application.Interfaces;
using FluentValidation;
namespace Cinema.Application.Validators.SeatValidators
{
    public class SeatCreateValidator : AbstractValidator<SeatCreateDto>
    {
        private readonly ISeatRepository _seatRepository;

        public SeatCreateValidator(ISeatRepository Seatrepository)
        {
            _seatRepository = Seatrepository;

            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(x => x.Row)
                .NotEmpty()
                .InclusiveBetween(1, 100)
                .WithMessage("Row number must be between 1 and 100.");

            RuleFor(x => x.SeatNo)
                .NotEmpty()
                .InclusiveBetween(1, 1000)
                .WithMessage("Seat number must be between 1 and 1000.");

            RuleFor(x => x.SeatTypeId)
                .GreaterThan(0)
                .WithMessage("Please select a valid seat type.");

            RuleFor(x => x.HallId)
                .GreaterThan(0);

            RuleFor(x => x)
                .MustAsync(async (dto, cancellation) =>
                {
                    bool exists = await _seatRepository.ExistsAsync(dto.HallId, dto.Row, dto.SeatNo);
                    return !exists;
                })
                .WithName("SeatNo")
                .WithMessage("This seat (Row/Number) already exists in this hall.");
        }
    }
}