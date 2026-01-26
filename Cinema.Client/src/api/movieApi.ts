import type { Response } from "../types/api.types";
import type {MovieShort } from "../types/Movie.types";
import { baseUrl, getPaginatedData } from "./Api";

export type FetchParams<T> = {
    page: number;
    pageSize: number;
    sortBy: keyof T;
    order: "asc" | "desc";
};
export const  getAllMovies = async (params: FetchParams<MovieShort>, signal?: AbortSignal): Promise<Response<MovieShort>> => {
    
    try{
        const result= await getPaginatedData<MovieShort>("/movies", params, signal);
        
        result.items = result.items.map((item:MovieShort) => ({
            ...item,
            releaseDate: new Date(item.releaseDate),
        }));
        
        return result;
    }catch(error){
        const err = error as Error;
        console.error(err.message);
        throw err;
    }
};

export async function deleteMovie(id:number) {
    const url=`${baseUrl}movie/${id}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.status === 204) {
            return true;
        }

        if (response.status === 404) {
            console.error('Movie not found');
            return false;
        }

        if (!response.ok) {
            throw new Error('Something went wrong on server side');
        }

    } catch (error) {
        console.error('Request error:', error);
        return false;
    }
};
