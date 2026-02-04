using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Interfaces.Services
{
    public interface IMovieService
    {
        Task DeleteMovieAsync(int id);
    }
}
