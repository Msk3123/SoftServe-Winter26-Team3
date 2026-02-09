import { postItem } from "./api";

export const reserveSessionSeat = async (id: number | string, userId:number |string) => {
    return await postItem(`SessionSeat/${id}/reserve?userId=${userId}`, {}); 
};