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
    genreIds:	number[];
    actorIds: number[];
}