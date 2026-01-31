using AutoMapper;
using Cinema.Application.DTOs.PaymentDtos;
using Cinema.Domain.Entities;
using Cinema.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{
    public class PaymentMapper : Profile
    {
        public PaymentMapper()
        {
            CreateMap<Payment, PaymentDetailsDto>()
            .ForMember(dest => dest.PaymentStatus, opt => opt.MapFrom(src => src.PaymentStatus.ToString()))
            .ForMember(dest => dest.PaymentMethod, opt => opt.MapFrom(src => src.PaymentMethod.ToString()))
            .ForMember(dest => dest.Tickets, opt => opt.MapFrom(src => src.Order.Tickets));

            CreateMap<PaymentCreateDto, Payment>()
                .ForMember(dest => dest.PaymentStatus, opt => opt.MapFrom(src => PaymentStatus.Pending))
                .ForMember(dest => dest.PaymentDate, opt => opt.MapFrom(src => DateTime.UtcNow));
        }
    }
}