using Cinema.Application.DTOs.OrderDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
    public interface IOrderService
    {

        Task<OrderDetailsDto> PlaceOrderAsync(OrderCreateDto dto);
    }
}
