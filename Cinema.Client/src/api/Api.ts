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

const buildUrl = (path: string, id?: number | string, params?: Record<string, unknown>): string => {
    let url = `${baseUrl}${path}${id ? `/${id}` : ''}`;
    
    if (params) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, String(value));
            }
        });
        
        const queryString = queryParams.toString();
        if (queryString) {
            url += url.includes('?') ? `&${queryString}` : `?${queryString}`;
        }
    }
    
    return url;
};

const getHeaders = (): HeadersInit => {
    const token = localStorage.getItem("accessToken");
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

async function handleResponse<T>(response: Response, context?: ErrorContext): Promise<T> {
    if (response.ok) {
        if (response.status === 204) {
            return undefined as unknown as T;
        }
        return await response.json();
    }

    if (response.status === 401) {
        localStorage.clear(); 
        throw new ApiError("Session expired. Please login again.", 401);
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

export async function fetchSingle<T>(
    path: string,
    params?: Record<string, unknown>
): Promise<SingleResponse<T>> {
    const url = buildUrl(path, undefined, params);
    const response = await fetch(url, { headers: getHeaders() });
    
    return handleResponse<SingleResponse<T>>(response);
}

export async function getPaginatedData<T extends BaseEntity>(
    path: string,
    { page = 1, pageSize = 20, sortBy = "id", order = "asc" }: FetchParams<T>,
    extraParams: Record<string, unknown> = {}
): Promise<PaginatedResponse<T>> {
    const queryParams = {
        page: page.toString(),
        limit: pageSize.toString(),
        sortBy: String(sortBy),
        order,
        ...extraParams
    };

    const url = buildUrl(path, undefined, queryParams);
    const response = await fetch(url, { headers: getHeaders() });
    
    return handleResponse<PaginatedResponse<T>>(response);

}

export async function getList<T extends BaseEntity>(
    path: string,
    params?: Record<string, unknown>
): Promise<T[]> {
    const url = buildUrl(path, undefined, params);
    const response = await fetch(url, { headers: getHeaders() });
    
    return handleResponse<T[]>(response);
}

export async function getListById<T extends BaseEntity>(
    path: string,
    id: number | string,
    params?: Record<string, unknown>
): Promise<T[]> {
    const url = buildUrl(path, id, params);
    const response = await fetch(url, { headers: getHeaders() });
    
    return handleResponse<T[]>(response);
}

export async function getItem<T extends BaseEntity>(
    path: string, 
    id: number | string,
    params?: Record<string, unknown>
): Promise<SingleResponse<T>> {
    const url = buildUrl(path, id, params);
    const response = await fetch(url, { headers: getHeaders() });
    
    return handleResponse<SingleResponse<T>>(response, { path, id });
}

export async function postItem<TData, TResponse>(
    path: string, 
    data: TData, 
    params?: 
    Record<string, unknown>
): Promise<SingleResponse<TResponse>> {
    const url = buildUrl(path, undefined ,params);
    const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(), 
        body: JSON.stringify(data),
    });
    return handleResponse<SingleResponse<TResponse>>(response);
}

export async function putItem<T>(
    path: string, 
    id: number | string, 
    data: T,
    params?: Record<string, unknown>
): Promise<void> {
    const url = buildUrl(path, id, params);
    const response = await fetch(url, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse<void>(response, { path, id });
}

export async function patchItem<T>(
    path: string, 
    id: number | string, 
    data: Partial<T>,
    params?: Record<string, unknown>
): Promise<void> {
    const url = buildUrl(path, id, params);
    const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse<void>(response, { path, id });
}

export async function deleteItem(
    path:string,id:number|string,
    params?: Record<string, unknown>
):Promise<void> {
    const url = buildUrl(path, id, params);
        
    const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(),
    });

    await handleResponse(response,{path,id});

};
