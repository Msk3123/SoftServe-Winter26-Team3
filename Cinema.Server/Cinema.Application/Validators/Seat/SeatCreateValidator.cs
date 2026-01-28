using Cinema.Application.DTOs.SeatDtos;
using Cinema.Application.Interfaces;
using FluentValidation;

public class SeatCreateValidator : AbstractValidator<SeatCreateDto>
{
    private readonly ISeatRepository _repository;

    public SeatCreateValidator(ISeatRepository repository)
    {
        _repository = repository;

        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(x => x.SeatNo)
            .GreaterThan(0)
            .InclusiveBetween(1, 1000)
            .WithMessage("Seat number must be between 1 and 1000.");

        RuleFor(x => x.SeatType)
            .GreaterThan(0);

        RuleFor(x => x.HallId)
            .GreaterThan(0);

        RuleFor(x => x)
            .MustAsync(async (dto, cancellation) =>
            {
                bool exists = await _repository.ExistsAsync(dto.HallId, dto.SeatNo);
                return !exists;
            })
            .WithName("SeatNo")
            .WithMessage("Seat with this number already exists in this hall.");
    }
}