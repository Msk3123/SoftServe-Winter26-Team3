using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.DTOs.SessionDtos
{
    public class CreateSessionsBatchDto
    {
        public int MovieId { get; set; }
        public int HallId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<TimeSpan> DailySchedule { get; set; } 
        public List<int> WeekDays { get; set; } 
    }
}
