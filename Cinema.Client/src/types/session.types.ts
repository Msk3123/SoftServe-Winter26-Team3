import type { ActorShort } from "./actor.types";
import type { FetchParams } from "./api.types";
import type { Genre } from "./genre.types";
import type { HallShort } from "./hall.types";
import type { MovieShort } from "./movie.types";

export const SessionFilter = {
    All: 0,
    Past: 1,
    Active: 2
} as const;

export type SessionFilterType = typeof SessionFilter[keyof typeof SessionFilter];

export interface SessionShort{
    id: number;
    sessionDate: string;
    sessionTime: string;
    movieTitle: string;
    hallName: string;
    posterUrl: string;
    movieId: number;
}
export interface Session{
    id:number;
    actors:ActorShort[];
    genres: Genre[];
    hall:HallShort;
    movie:MovieShort;
    sessionDate: string;
    sessionTime: string;
}

export interface SessionCreate {
    movieId: number|string;
    hallId: number|string;
    sessionDate: string;
    sessionTime: string;
}

export const mapSessionToShort = (session: Session): SessionShort =>{
    return {
        id:session.id,
        sessionDate: session.sessionDate,
        sessionTime: session.sessionTime,
        movieTitle:session.movie.title,
        hallName: session.hall.hallName,
        posterUrl: session.movie.posterUrl,
        movieId: session.movie.id,
    };
}

export const mapSessionToCreate = (session: Session): SessionCreate =>{
    return {
        movieId: session.movie.id,
        hallId: session.hall.id,
        sessionDate: session.sessionDate,
        sessionTime: session.sessionTime
    }
}
export interface CreateSessionsBatch {
    movieId: number|string;
    hallId: number|string;
    
    startDate: string;
    endDate: string;
    
    dailySchedule: string[];
    weekDays: number[];
}

export interface SessionQueryParams extends FetchParams<SessionShort> {
    sessionFilter?: SessionFilterType;
    movieId?: number | string;
}