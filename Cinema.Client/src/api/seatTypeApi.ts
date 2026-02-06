import type {FetchPaginatedListFunction, FetchOneFunction, PatchFunction, PostFunction, PutFunction, } from "../types/api.types";
import type { SeatType, SeatTypeCreate } from "../types/seatType.types";
import { getPaginatedData, deleteItem, defaultParams, getItem, postItem, putItem, patchItem } from "./api";


export const getAllSeatType: FetchPaginatedListFunction<SeatType> = async (params = defaultParams) => {
    return await getPaginatedData<SeatType>("seatTypes", params);
};

export const getNews:FetchOneFunction<SeatType> = async (id)=>{
    return await getItem("seatTypes",id);
}

export const postSeatType:PostFunction<SeatTypeCreate,SeatType>= async(data)=>{
    return await postItem("seatTypes",data);
}
export const putSeatType:PutFunction<SeatTypeCreate>= async(id,data)=>{
    return await putItem("seatTypes",id,data);
}
export const patchSeatType:PatchFunction<SeatTypeCreate>= async(id,data)=>{
    return await patchItem("seatTypes",id,data);
}

export const deleteSeatType = async (id: number | string) => {
    return await deleteItem("seatTypes", id);
};