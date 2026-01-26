import type { Response } from "../types/api.types";
import { baseUrl, getPaginatedData } from "./Api";
import type { FetchParams } from "./movieApi";

export interface HallShortDto {
    id: number;
    hallName: string;
    capacity: number;
}

export const  getAllHalls = async (params: FetchParams<HallShortDto>): Promise<Response<HallShortDto>> => {
    
    try{
        return  getPaginatedData<HallShortDto>("hall", params);
    }catch(error){
        const err = error as Error;
        console.error(err.message);
        throw err;
    }
};

export async function deletehall(id:number) {
    const url=`${baseUrl}hall/${id}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.status === 204) {
            return true;
        }

        if (response.status === 404) {
            console.error('hall not found');
            return false;
        }

        if (!response.ok) {
            throw new Error('Something went wrong on server side');
        }

    } catch (error) {
        console.error('Request error:', error);
        return false;
    }
};
