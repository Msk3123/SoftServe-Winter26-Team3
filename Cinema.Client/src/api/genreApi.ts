import type {FetchListFunction, FetchOneFunction,PatchFunction, PostFunction, PutFunction, } from "../types/api.types";
import type { Genre, GenreCreate } from "../types/genre.types";
import { getPaginatedData, deleteItem, defaultParams, getItem, postItem, putItem, patchItem } from "./api";


export const getAllGenres: FetchListFunction<Genre> = async (params = defaultParams) => {
    return await getPaginatedData<Genre>("genres", params);
};

export const getGenre:FetchOneFunction<Genre> = async (id)=>{
    return await getItem("genres",id);
}

export const postGenre:PostFunction<GenreCreate,Genre>= async(data)=>{
    return await postItem("genres",data);
}
export const putGenre:PutFunction<GenreCreate>= async(id,data)=>{
    return await putItem("genres",id,data);
}
export const patchGenre:PatchFunction<GenreCreate>= async(id,data)=>{
    return await patchItem("genres",id,data);
}

export const deleteGenre = async (id: number | string) => {
    return await deleteItem("genres", id);
};