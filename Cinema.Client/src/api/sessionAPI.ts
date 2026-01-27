import type { DeleteFunction, FetchFunction } from "../types/api.types";
import type { SessionShort } from "../types/session.types";
import { deleteItem, getPaginatedData } from "./api";



export const  getAllSessions:FetchFunction<SessionShort> = async (params) => {
    return  getPaginatedData<SessionShort>("session", params);
};

export const deleteSession: DeleteFunction= async (id)=>{
    return deleteItem("session",id);
};
