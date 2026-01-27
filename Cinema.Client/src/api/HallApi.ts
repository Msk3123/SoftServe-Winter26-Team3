
import type { DeleteFunction, FetchFunction } from "../types/api.types";
import type { HallShort } from "../types/hall.types";
import { deleteItem, getPaginatedData } from "./api";



export const  getAllHalls:FetchFunction<HallShort> = async (params) => {
    return  getPaginatedData<HallShort>("hall", params);
};

export const deleteHall: DeleteFunction = async (id)=>{
    return deleteItem("hall",id);
};
