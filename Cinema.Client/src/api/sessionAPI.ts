import type { FetchFunction } from "../types/api.types";
import type { SessionShort } from "../types/session.types";
import { deleteItem, getPaginatedData } from "./api";



export const  getAllHalls:FetchFunction<SessionShort> = async (params) => {
    return  getPaginatedData<SessionShort>("session", params);
};

export async function deleteSession(id:number): Promise<boolean | undefined>{
    return deleteItem("session",id);
};
