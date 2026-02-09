import type { DeleteFunction, FetchOneFunction, FetchPaginatedListFunction, PatchFunction, PostFunction, PutFunction } from "../types/api.types";
import type { User, UserCreate } from "../types/user.types";
import { defaultParams, deleteItem, getItem, getPaginatedData, patchItem, postItem, putItem } from "./api";

export const getAllUsers :FetchPaginatedListFunction<User> = async (params=defaultParams)=>{
    return await getPaginatedData("users",params)
}
export const getUser: FetchOneFunction<User> = async (id) => {
    return await getItem("users", id);
};

export const postUser: PostFunction<UserCreate,User> = async (data)=>{
    return await postItem("users",data);
}
export const putUser:PutFunction<UserCreate> = async(id,data)=>{
    return await putItem("users",id,data);
}
export const patchUser:PatchFunction<UserCreate> = async(id,data)=>{
    return await patchItem("users",id,data);
}
export const deleteUser:DeleteFunction = async (id)=>{
    return deleteItem("users",id);
};