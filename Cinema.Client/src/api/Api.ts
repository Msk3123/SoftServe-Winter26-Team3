import { capitalizeFirstLetter } from "../helpers/textHelpers";
import { type PaginatedResponse, type BaseEntity, type FetchParams, type SingleResponse, ApiError} from "../types/api.types";

export const baseUrl = import.meta.env.VITE_API_URL;

export const defaultParams : FetchParams<BaseEntity>= {
    page: 1,
    pageSize: 20,
    sortBy: "id",
    order: "asc"
};

interface ErrorContext {
    path?: string;
    id?: number | string;
}

async function handleResponse<T>(response: Response,context?: ErrorContext): Promise<T> {

    if (response.ok) {
        if (response.status === 204) {
            return undefined as unknown as T;
        }
        return await response.json();
    }

    let errorData;
    try {
        errorData = await response.json();
    } catch {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
    }
    if (response.status === 400 && errorData.errors) {
        throw new ApiError(
            errorData.message || "Validation Failed",
            response.status,
            errorData.errors
        );
    }
    if (response.status === 404) {
        if (context?.path && context?.id) {
            throw new ApiError(
                `${capitalizeFirstLetter(context.path)} with id '${context.id}' not found`,
                404,
                errorData?.errors
            );
        }
        
        throw new ApiError(errorData.message || "Resource not found", 404);
    }

    throw new ApiError(
        errorData.message || `Error ${response.status}`, 
        response.status
    );
}

export async function getPaginatedData<T extends BaseEntity>(
    path: string,
    { page = 1, pageSize = 20, sortBy = "id", order = "asc" }: FetchParams<T>,
    extraParams: Record<string, any> = {} 
    ): Promise<PaginatedResponse<T>> {

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        sortBy: String(sortBy),
        order,
        ...extraParams // Розпаковуємо фільтри (movieId, query, filter тощо)
    });

    // Видаляємо undefined значення, щоб не було ?movieId=undefined
    Object.keys(extraParams).forEach(key => {
        if (extraParams[key] === undefined || extraParams[key] === null) {
            queryParams.delete(key);
        }
    });

    const url = `${baseUrl}${path}?${queryParams.toString()}`;

    const response = await fetch(url);
    return handleResponse<PaginatedResponse<T>>(response);

}

export async function getList<T extends BaseEntity>(
    path: string
): Promise<T[]> {

    const url = `${baseUrl}${path}`;

    const response = await fetch(url);
    return handleResponse<T[]>(response);
}

export async function getListById<T extends BaseEntity>(
    path: string,
    id:number|string
): Promise<T[]> {

    const url = `${baseUrl}${path}/${id}`;

    const response = await fetch(url);
    return handleResponse<T[]>(response);

}

export async function getItem<T extends BaseEntity>(path:string,id:number|string):Promise<SingleResponse<T>> {
    const url = `${baseUrl}${path}/${id}`;
    
    const response = await fetch(url);
        
    return handleResponse<SingleResponse<T>>(response,{path,id});

}
export async function postItem<TData, TResponse>(
    path: string,
    data: TData
): Promise<SingleResponse<TResponse>> {

    const url = `${baseUrl}${path}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return handleResponse<SingleResponse<TResponse>>(response);
}

export async function putItem<T>(
    path: string,
    id: number | string,
    data: T
): Promise<void> {

    const url =`${baseUrl}${path}/${id}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse<void>(response,{path,id});
}
export async function patchItem<T>(
    path: string,
    id: number | string,
    data: Partial<T>
): Promise<void> {
    const url =`${baseUrl}${path}/${id}`;
    
    const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return handleResponse<void>(response,{path,id});

}

export async function deleteItem(path:string,id:number|string):Promise<boolean | undefined> {
    const url=`${baseUrl}${path}/${id}`;
        
    const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

    try {
        await handleResponse(response,{path,id});
        return true;
    }catch(error){
        console.error(error);
        return false;
    }
};