import type { MovieResponse, MovieShort } from "../types/Movie.types";
import { baseUrl } from "./Api";

export async function getAllMovies({ page=1, pageSize=30,sortBy="id",order="asc"}:
    {
    page:number,
    pageSize:number,
    sortBy:string,
    order:"asc"|"desc"
    }):Promise<MovieResponse>{

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        sortBy,
        order,
    });

    const url = `${baseUrl}movie?${queryParams.toString()}`;
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const result = await response.json();

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
}

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
