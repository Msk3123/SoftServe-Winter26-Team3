import type { DeleteFunction, FetchOneFunction, FetchPaginatedListFunction, PatchFunction, PostFunction, PutFunction } from "../types/api.types";
import type { User, UserCreate } from "../types/user.types";
import { defaultParams, deleteItem, getItem, getPaginatedData, patchItem, postItem, putItem } from "./api";

export const getAllUsers :FetchPaginatedListFunction<User> = async (params=defaultParams)=>{
    return await getPaginatedData("user",params)
};

export const getUser: FetchOneFunction<User> = async (id) => {
    return await getItem("user", id);
};

export const postUser: PostFunction<UserCreate,User> = async (data)=>{
    return await postItem("user",data);
}
export const putUser:PutFunction<UserCreate> = async(id,data)=>{
    return await putItem("user",id,data);
}
export const patchUser:PatchFunction<UserCreate> = async(id,data)=>{
    return await patchItem("user",id,data);
}
export const deleteUser:DeleteFunction = async (id)=>{
    return deleteItem("user",id);
};