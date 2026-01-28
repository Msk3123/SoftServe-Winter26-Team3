import type { DeleteFunction, FetchFunction} from "../types/api.types";
import type { MovieShort } from "../types/movie.types";
import { deleteItem, getPaginatedData } from "./api";

export const  getAllMovies: FetchFunction<MovieShort> = async (params) => {
    
    try{
        const result= await getPaginatedData<MovieShort>("movie", params);
        
        result.items = result.items.map((item:MovieShort) => ({
            ...item,
            releaseDate: new Date(item.releaseDate),
        }));
        
        return result;
    }catch(error){
        const err = error as Error;
        console.error(err.message);
        throw new Error(`${err.message}. Failed to load movies data. Please try again later.`);
    }
};

export const deleteMovie:DeleteFunction = async (id)=>{
    return deleteItem("movie",id);
};
