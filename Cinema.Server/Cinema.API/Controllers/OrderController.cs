using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.OrderDto;
using Cinema.Application.DTOs.OrderDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ApiBaseController
    {
        private readonly IOrderService _orderService;
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderService orderService, IOrderRepository orderRepository, IMapper mapper) :base(mapper) 
        {
            _orderService = orderService;
            _orderRepository = orderRepository;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            var orders = await _orderRepository.GetAllPagedAsync(queryParameters);
            
            return OkPaged<Order, OrderShortDto>(orders, queryParameters);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto dto)
        {
            var result = await _orderService.PlaceOrderAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetHistory(int userId, [FromQuery] QueryParameters queryParameters)
        {
            var currentUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (!User.IsInRole("Admin") && currentUserId != userId.ToString())
            {
                return Forbid();
            }

            var history = await _orderRepository.GetByUserIdPagedAsync(userId, queryParameters);
            return OkPaged<Order, OrderShortDto>(history, queryParameters);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            var result = _mapper.Map<OrderDetailsDto>(order);
            return Ok(result);
        }
    }
}