using Cinema.Application.Common.Exceptions;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Services
{
    public class MovieService : IMovieService
    {
        private readonly IUnitOfWork _unitOfWork;
        public MovieService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task DeleteMovieAsync(int id)
        {
            var movie = await _unitOfWork.Movies.GetByIdAsync(id);
            if (movie == null) throw new KeyNotFoundException("Movie not found");

            var sessions = await _unitOfWork.Sessions.GetByMovieId(id);
            if (sessions.Any(s => s.SessionDate > DateTime.UtcNow))
            {
                throw new UnavailableOperationException("Cannot soft-delete movie with upcoming sessions.");
            }

            movie.IsDeleted = true;

            foreach (var session in sessions)
            {
                session.IsDeleted = true;
            }

            await _unitOfWork.SaveChangesAsync();
        }
    }
}

