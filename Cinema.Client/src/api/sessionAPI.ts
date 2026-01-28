import type { DeleteFunction, FetchFunction } from "../types/api.types";
import type { SessionShort } from "../types/session.types";
import { defaultParams, deleteItem, getPaginatedData } from "./api";



export const  getAllSessions:FetchFunction<SessionShort> = async (params=defaultParams) => {
    try{
        return  await getPaginatedData<SessionShort>("session", params);
    }catch(error){
        const err = error as Error;
        console.error(err.message);
        throw new Error(`${err.message}. Failed to load sessions data. Please try again later.`);
    }
};

export const deleteSession: DeleteFunction= async (id)=>{
    return deleteItem("session",id);
};
