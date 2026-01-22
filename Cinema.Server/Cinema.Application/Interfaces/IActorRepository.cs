using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IActorRepository : IRepository<Actor>
    {
        Task<Actor?> GetByIdWithMoviesAsync(int id);
    }
}
