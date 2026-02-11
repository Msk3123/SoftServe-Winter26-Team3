import type { PaginatedResponse, DeleteFunction, FetchPaginatedListFunction, FetchPaginatedListByIdFunction, FetchOneFunction, PostFunction, PutFunction, PatchFunction} from "../types/api.types";
import type { Movie, MovieCreate, MovieShort} from "../types/movie.types";
import { defaultParams, deleteItem, getItem, getPaginatedData, patchItem, postItem, putItem } from "./api";


export const  getAllMovies: FetchPaginatedListFunction<MovieShort> = async (params=defaultParams) => {
    return await getPaginatedData<MovieShort>("movie", params);

};

export const getUpcomingMovies:  FetchPaginatedListFunction<MovieShort> = async (params=defaultParams) => {
    return await getPaginatedData<MovieShort>("Movie/upcoming", params);
};

export const getNowShowingMovies: FetchPaginatedListFunction<MovieShort> = async (params = defaultParams) => {
    return await getPaginatedData<MovieShort>("Movie/now-showing", params);
};

export const getMoviesByActor: FetchPaginatedListByIdFunction<MovieShort> = async (actorId,params = defaultParams) => {
    return await getPaginatedData<MovieShort>(`movie/actor/${actorId}`, params);
};

export const getMoviesByGenre: FetchPaginatedListByIdFunction<MovieShort> = async (genreId,params = defaultParams) => {
    return await getPaginatedData<MovieShort>(`movie/genre/${genreId}`, params);
};

export const getMovie:FetchOneFunction<Movie> = async (id)=>{
    return await getItem("movie",id);
}

export const postMovie:PostFunction<MovieCreate,Movie>= async(data)=>{
    return await postItem("movie",data);
}
export const putMovie:PutFunction<MovieCreate>= async(id,data)=>{
    return await putItem("movie",id,data);
}
export const patchMovie:PatchFunction<MovieCreate>= async(id,data)=>{
    return await patchItem("movie",id,data);
}
export const deleteMovie:DeleteFunction = async (id)=>{
    return deleteItem("movie",id);
};

//method for homePage
export const getMovies = async (type: 'now' | 'soon'): Promise<PaginatedResponse<MovieShort>> => {
        if(type==='now'){
            return await getNowShowingMovies();
        }else{
            return await getUpcomingMovies();
        }
};


