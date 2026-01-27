import { capitalizeFirstLetter } from "../helpers/textHelpers";
import type { ApiResponse, BaseEntity, FetchParams} from "../types/api.types";

export const baseUrl = import.meta.env.VITE_API_URL;

export async function getPaginatedData<T extends BaseEntity>(
    path: string,
    { page = 1, pageSize = 30, sortBy = "id", order = "asc" }: FetchParams<T>
): Promise<ApiResponse<T>> {

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        sortBy: String(sortBy),
        order,
    });

    const url = `${baseUrl}${path}?${queryParams.toString()}`;
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const result = await response.json();
        
        return result;
    }catch(error){
        const err = error as Error;
        console.error(err.message);
        throw err;
    }
}


export async function deleteItem(path:string,id:number|string):Promise<boolean | undefined> {
    const url=`${baseUrl}${path}/${id}`;
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
            console.error(`${capitalizeFirstLetter(path)} with id '${id}' not found`);
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