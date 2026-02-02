
import type { DeleteFunction, FetchListFunction} from "../types/api.types";
import type { HallShort } from "../types/hall.types";
import { defaultParams, deleteItem, getPaginatedData } from "./api";



export const  getAllHalls:FetchListFunction<HallShort> = async (params = defaultParams ) => {
        return await getPaginatedData<HallShort>("hall", params);

};

export const deleteHall: DeleteFunction = async (id)=>{
    return deleteItem("hall",id);
};
