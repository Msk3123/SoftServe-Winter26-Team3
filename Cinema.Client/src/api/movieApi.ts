import type { ApiResponse, DeleteFunction, FetchFunction} from "../types/api.types";
import type { MovieShort } from "../types/movie.types";
import { defaultParams, deleteItem, getPaginatedData } from "./api";


const mapMoviesWithDate = (items: MovieShort[]): MovieShort[] => {
    return items.map((item) => ({
        ...item,
        releaseDate: new Date(item.releaseDate),
    }));
};

export const  getAllMovies: FetchFunction<MovieShort> = async (params=defaultParams) => {
    
    try{
        const result= await getPaginatedData<MovieShort>("movie", params);
        result.items = mapMoviesWithDate(result.items);
        return result;
    }catch(error){
        const err = error as Error;
        throw new Error(`${err.message}. Failed to load movies data. Please try again later.`);
    }
};

export const getUpcomingMovies: FetchFunction<MovieShort> = async (params=defaultParams) => {
    const result = await getPaginatedData<MovieShort>("Movie/upcoming", params);
    result.items = mapMoviesWithDate(result.items);
    return result;
};

export const getNowShowingMovies: FetchFunction<MovieShort> = async (params = defaultParams) => {
    const result = await getPaginatedData<MovieShort>("Movie/now-showing", params);
    result.items = mapMoviesWithDate(result.items);
    return result;
};

//method for homePage
export const getMovies = async (type: 'now' | 'soon'): Promise<ApiResponse<MovieShort>> => {
        if(type==='now'){
            return await getNowShowingMovies();
        }else{
            return await getUpcomingMovies();
        }
};

export const deleteMovie:DeleteFunction = async (id)=>{
    return deleteItem("movie",id);
};
