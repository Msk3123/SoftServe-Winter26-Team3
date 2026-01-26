import type { Response } from "../types/api.types";
import { baseUrl, getPaginatedData } from "./Api";
import type { FetchParams } from "./movieApi";

export interface SessionShortDto {
    id: number;
    sessionDate: string;
    sessionTime: string;
    movieTitle: string;
    hallName: string;
    posterUrl: string;
}

export const  getAllSessions = async (params: FetchParams<SessionShortDto>): Promise<Response<SessionShortDto>> => {
    
    try{
        return  getPaginatedData<SessionShortDto>("session", params);
    }catch(error){
        const err = error as Error;
        console.error(err.message);
        throw err;
    }
};

export async function deleteSession(id:number) {
    const url=`${baseUrl}session/${id}`;
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
            console.error('Session not found');
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
