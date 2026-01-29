using Cinema.Application.Interfaces;
using Cinema.Domain.Entities;
using Cinema.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Persistence.Repositories
{
    public class TicketTypeRepository : Repository<TicketType>, ITicketTypeRepository
    {
        public TicketTypeRepository(AppDbContext context) : base(context) { }
        

        
    }
}
