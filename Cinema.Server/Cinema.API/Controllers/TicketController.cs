using AutoMapper;
using Cinema.API.Controllers;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.TicketDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ApiBaseController
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketController(ITicketRepository ticketRepository, IMapper mapper) : base(mapper)
        {
            _ticketRepository = ticketRepository;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserTickets(int userId, [FromQuery] QueryParameters queryParameters)
        {
            var result = await _ticketRepository.GetTicketsByUserIdPagedAsync(userId, queryParameters);
            if (result.Items == null) throw new KeyNotFoundException($"No tickets found for user with id {userId}.");
            
            return OkPaged<Ticket, TicketShortDto>(result,queryParameters);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDetailsDto>> GetTicketDetails(int id)
        {
            var result = await _ticketRepository.GetTicketWithDetailsAsync(id);
            if (result == null) throw new KeyNotFoundException($"Ticket with id {id} not found.");

            return Ok(_mapper.Map<TicketDetailsDto>(result));
        }
        [HttpGet("order/{orderId}")]
        public async Task<ActionResult<IEnumerable<TicketDetailsDto>>> GetOrderTickets(int orderId)
        {
            var result = await _ticketRepository.GetTicketsByOrderIdAsync(orderId);
             if (result == null || !result.Any()) throw new KeyNotFoundException($"No tickets found for order with id {orderId} .");
            var response = _mapper.Map<List<TicketShortDto>>(result);
            return Ok(response);
        }
    }
}