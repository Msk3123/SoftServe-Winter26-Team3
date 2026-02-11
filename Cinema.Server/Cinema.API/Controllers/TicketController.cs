using AutoMapper;
using Cinema.API.Controllers;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.TicketDtos;
using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketController : ApiBaseController
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketController(ITicketRepository ticketRepository, IMapper mapper) : base(mapper)
        {
            _ticketRepository = ticketRepository;
        }

        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetUserTickets(int userId, [FromQuery] QueryParameters queryParameters)
        {
            var currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (!User.IsInRole("Admin") && currentUserId != userId.ToString()) return Forbid();

            var result = await _ticketRepository.GetTicketsByUserIdPagedAsync(userId, queryParameters);
            return OkPaged<Ticket, TicketDetailsDto>(result, queryParameters);
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
        [HttpGet("my-ticket/{id}")]
        [Authorize]
        public async Task<IActionResult> GetSecureTicket(int id)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim)) return Unauthorized();

            var ticket = await _ticketRepository.GetTicketByIdAndUserIdAsync(id, userIdClaim);

            if (ticket == null)
            {
                return NotFound("Ticket not found or access denied.");
            }
            
            var result = _mapper.Map<TicketDetailsDto>(ticket);

            return Ok(result);
        }
    }
}