import type { DeleteFunction, FetchFunction} from "../types/api.types";
import type { MovieShort } from "../types/movie.types.ts";
import { deleteItem, getPaginatedData } from "./api.ts";

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
        throw err;
    }
};

export const deleteMovie:DeleteFunction = async (id)=>{
    return deleteItem("movie",id);
};
