using Cinema.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cinema.Application.Helpers
{
    public static class MovieHelper
    {
        public static void UpdateGenres(Movie movie, IEnumerable<int> newGenreIds)
        {
            movie.GenreMovies ??= new List<GenreMovie>();

            var toRemove = movie.GenreMovies.Where(gm => !newGenreIds.Contains(gm.GenreId)).ToList();
            foreach (var gm in toRemove) movie.GenreMovies.Remove(gm);

            var currentIds = movie.GenreMovies.Select(gm => gm.GenreId);
            foreach (var id in newGenreIds.Except(currentIds))
            {
                movie.GenreMovies.Add(new GenreMovie { GenreId = id, MovieId = movie.MovieId });
            }
        }

        public static void UpdateActors(Movie movie, IEnumerable<int> newActorIds)
        {
            movie.ActorMovies ??= new List<ActorMovie>();

            var toRemove = movie.ActorMovies.Where(am => !newActorIds.Contains(am.ActorId)).ToList();
            foreach (var am in toRemove) movie.ActorMovies.Remove(am);

            var currentIds = movie.ActorMovies.Select(am => am.ActorId);
            foreach (var id in newActorIds.Except(currentIds))
            {
                movie.ActorMovies.Add(new ActorMovie { ActorId = id, MovieId = movie.MovieId });
            }
        }
    }
}
