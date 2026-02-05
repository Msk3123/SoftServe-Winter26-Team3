using AutoMapper;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.LiqPayDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Mappings
{
    public class LiqPayCallbackMapper : Profile
    {
            public LiqPayCallbackMapper()
            {
                CreateMap<LiqPayCallbackDto, LiqPayCallback>();
                CreateMap<LiqPayCallback, LiqPayCallbackDto>();
        }
    }
}
