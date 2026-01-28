
import type { DeleteFunction, FetchFunction } from "../types/api.types";
import type { HallShort } from "../types/hall.types";
import { deleteItem, getPaginatedData } from "./api";



export const  getAllHalls:FetchFunction<HallShort> = async (params) => {
    try{
        return await getPaginatedData<HallShort>("hall", params);
    }catch(error){
        const err = error as Error;
        console.error(err.message);
        throw new Error(`${err.message}. Failed to load halls data. Please try again later.`);
    }
};

export const deleteHall: DeleteFunction = async (id)=>{
    return deleteItem("hall",id);
};
