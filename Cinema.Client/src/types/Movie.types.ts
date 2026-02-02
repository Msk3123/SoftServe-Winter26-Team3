import type { ActorShort } from "./actor.types";
import type { Genre } from "./genre.types";

export interface MovieShort{
    id:number;
    title:string;
    posterUrl: string;
    releaseDate: string;
}


export interface Movie{
    id:number;
    duration:number;
    rating:	number;
    description:string;
    title:string;
    posterUrl: string;
    trailerUrl: string;
    language: string;
    releaseDate: string;
    startDate:	string;
    endDate: string;
    genres:	Genre[];
    actors: ActorShort[];
}

export interface MovieCreate{
    duration:number;
    rating:	number;
    description:string;
    title:string;
    posterUrl: string;
    trailerUrl: string;
    language: string;
    releaseDate: string;
    startDate:	string;
    endDate: string;
    genreIds:	(number|string)[];
    actorIds: (number|string)[];
}

export const mapMovieToCreate = (movie: Movie): MovieCreate => {
  return {
    title: movie.title,
    duration: movie.duration,
    rating: movie.rating,
    description: movie.description,
    posterUrl: movie.posterUrl,
    trailerUrl: movie.trailerUrl,
    language: movie.language,
    releaseDate: movie.releaseDate,
    startDate: movie.startDate,
    endDate: movie.endDate,
    genreIds: movie.genres.map(g => g.id),
    actorIds: movie.actors.map(a => a.id),
  };
};