export interface MovieShort{
    id:number;
    title:string;
    posterUrl: string;
    releaseDate: Date;
}

export interface MovieResponse {
    items: MovieShort[];
    totalCount:number;
    pageNumber: number;
    pageSize: number;
}