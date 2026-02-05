using AutoMapper;
using Cinema.Application.Common.Exceptions;
using Cinema.Application.Common.Models;
using Cinema.Application.DTOs.MovieDtos;
using Cinema.Application.Interfaces;
using Cinema.Application.Interfaces.Services;
using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;
using System.Text;

namespace Cinema.Application.Services
{
    public class MovieService : IMovieService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public MovieService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _mapper = mapper;
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
        public async Task<(IEnumerable<Movie> items, int totalCount)> SearchMoviesAsync(string searchTerm, QueryParameters queryParameters)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return (Enumerable.Empty<Movie>(), 0);


            var movies = await _unitOfWork.Movies.SearchByTitleAsync(searchTerm.Trim(), queryParameters);

            return movies;
        }
    }
}

