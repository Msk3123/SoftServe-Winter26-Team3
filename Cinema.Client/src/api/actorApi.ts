import type { Actor, ActorCreate, ActorShort } from "../types/actor.types";
import type { DeleteFunction, FetchPaginatedListFunction, FetchOneFunction, PatchFunction, PostFunction, PutFunction } from "../types/api.types";
import { defaultParams, deleteItem, getItem, getPaginatedData, patchItem, postItem, putItem } from "./api";

export const  getAllActors:FetchPaginatedListFunction<ActorShort> = async (params = defaultParams ) => {
    return await getPaginatedData<ActorShort>("actors", params);

};
export const getActor:FetchOneFunction<Actor> = async (id)=>{
    return await getItem("actors",id);
}
export const postActor:PostFunction<ActorCreate,Actor>= async(data)=>{
    return await postItem("actors",data);
}
export const putActor:PutFunction<ActorCreate>= async(id,data)=>{
    return await putItem("actors",id,data);
}
export const patchActor:PatchFunction<ActorCreate>= async(id,data)=>{
    return await patchItem("actors",id,data);
}
export const deleteActor:DeleteFunction = async (id)=>{
    return deleteItem("actors",id);
};