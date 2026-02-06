
import type { DeleteFunction, FetchPaginatedListFunction, FetchOneFunction, PatchFunction, PostFunction, PutFunction} from "../types/api.types";
import type { HallCreate, HallShort } from "../types/hall.types";
import { defaultParams, deleteItem, getItem, getPaginatedData, patchItem, postItem, putItem } from "./api";



export const  getAllHalls:FetchPaginatedListFunction<HallShort> = async (params = defaultParams ) => {
        return await getPaginatedData<HallShort>("hall", params);
};

export const getHall:FetchOneFunction<HallShort> = async (id)=>{
    return await getItem("hall",id);
}

export const postHall:PostFunction<HallCreate,HallShort>= async(data)=>{
    return await postItem("hall",data);
}
export const putHall:PutFunction<HallCreate>= async(id,data)=>{
    return await putItem("hall",id,data);
}
export const patchHall:PatchFunction<HallCreate>= async(id,data)=>{
    return await patchItem("hall",id,data);
}

export const deleteHall: DeleteFunction = async (id)=>{
    return deleteItem("hall",id);
};
