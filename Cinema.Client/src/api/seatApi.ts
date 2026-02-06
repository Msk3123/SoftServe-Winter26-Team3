import type {DeleteFunction, FetchOneFunction, PostFunction, PutFunction, PatchFunction, FetchListByIdFunction, FetchListFunction} from "../types/api.types";
import type { SeatCreate, SeatDetails, SeatShort} from "../types/seat.types";
import {deleteItem, getItem, getList, getListById,patchItem, postItem, putItem } from "./api";


export const getAllSeats: FetchListFunction<SeatShort> = async () => {
    return await getList<SeatShort>("seat");
};

export const getSeatsByHall: FetchListByIdFunction<SeatShort> = async (hallId:number|string) => {
    return await getListById<SeatShort>("seat/hall",hallId);
};


export const getSeat: FetchOneFunction<SeatDetails> = async (id) => {
    return await getItem("seat", id);
};

export const postSeat: PostFunction<SeatCreate, SeatDetails> = async (data) => {
    return await postItem("seat", data);
};

export const putSeat: PutFunction<SeatCreate> = async (id, data) => {
    return await putItem("seat", id, data);
};

export const patchSeat: PatchFunction<SeatCreate> = async (id, data) => {
    return await patchItem("seat", id, data);
};

export const deleteSeat: DeleteFunction = async (id) => {
    return deleteItem("seat", id);
};