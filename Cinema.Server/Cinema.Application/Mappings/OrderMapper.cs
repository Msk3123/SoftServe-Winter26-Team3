using AutoMapper;
using Cinema.Application.DTOs.OrderDto;
using Cinema.Application.DTOs.OrderDtos;
using Cinema.Application.DTOs.SeatDtos;
using Cinema.Application.DTOs.TicketDtos;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{

    public class OrderMapper : Profile
    {
        public OrderMapper()
        {
            CreateMap<Order, OrderShortDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.OrderId));

            CreateMap<Order, OrderDetailsDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.OrderId))
                .ForMember(dest => dest.Tickets, opt => opt.MapFrom(src => src.Tickets))
                .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.Tickets.Sum(t => t.Price)));

            CreateMap<OrderCreateDto, Order>()
                .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(_ => DateTime.UtcNow));

            CreateMap<SeatPatchDto, Seat>()
                .ForMember(dest => dest.SeatId, opt => opt.Ignore())
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) =>
                    srcMember != null &&
                    !(srcMember is int i && i == 0) &&
                    !(srcMember is decimal d && d == 0)
                    ));
        }
    }
    
        
    
}
