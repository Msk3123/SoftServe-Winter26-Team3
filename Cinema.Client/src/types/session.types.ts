export interface SessionShort{
    id: number;
    sessionDate: string;
    sessionTime: string;
    movieTitle: string;
    hallName: string;
    posterUrl: string;
}
export interface Session extends SessionShort {
    movieId: number;
    hallId: number;
    basePrice: number;
}

export interface SessionCreate {
    movieId: number;
    hallId: number;
    sessionDate: string;
    sessionTime: string;
    basePrice: number;
}