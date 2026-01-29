import type { DeleteFunction, FetchListFunction } from "../types/api.types";
import type { SessionShort } from "../types/session.types";
import { defaultParams, deleteItem, getPaginatedData } from "./api";



export const  getAllSessions:FetchListFunction<SessionShort> = async (params=defaultParams) => {
    return  await getPaginatedData<SessionShort>("session", params);
};

export const deleteSession: DeleteFunction= async (id)=>{
    return deleteItem("session",id);
};
