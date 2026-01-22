using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces
{
    public interface IMovieRepository:IRepository<Movie>
    {
        Task<IEnumerable<Movie>> GetAllWithGenresAsync();
        Task<Movie?> GetByIdWithDetailsAsync(int id);
        Task<IEnumerable<Movie>> SearchByTitleAsync(string title);
    }
}
