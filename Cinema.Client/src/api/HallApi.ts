
import type { FetchFunction } from "../types/api.types";
import type { HallShort } from "../types/hall.types";
import { deleteItem, getPaginatedData } from "./api";



export const  getAllHalls:FetchFunction<HallShort> = async (params) => {
    return  getPaginatedData<HallShort>("hall", params);
};

export async function deletehall(id:number): Promise<boolean | undefined>{
    return deleteItem("hall",id);
};
