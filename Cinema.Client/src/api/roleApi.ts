import type { FetchOneFunction, FetchPaginatedListFunction } from "../types/api.types";
import type { Role } from "../types/role.types";
import { defaultParams, getItem, getPaginatedData } from "./api";

export const  getAllRoles:FetchPaginatedListFunction<Role> = async (params = defaultParams ) => {
    return await getPaginatedData<Role>("roles", params);

};
export const getRole:FetchOneFunction<Role> = async (id)=>{
    return await getItem("roles",id);
}