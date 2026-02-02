using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.HallDtos
{
    public class HallCreateDto
    {
        public string HallName { get; set; }
        public int Rows { get; set; }
        public int SeatsPerRow { get; set; }
    }
}
