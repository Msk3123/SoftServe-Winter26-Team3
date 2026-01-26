import type { Response } from "../types/api.types";

export const baseUrl = import.meta.env.VITE_API_URL;

export async function getPaginatedData<T extends { id: number }>(
    path: string,
    { page = 1, pageSize = 30, sortBy = "id", order = "asc" }: {
        page: number,
        pageSize: number,
        sortBy: keyof T,
        order: "asc" | "desc"
    },
    signal?: AbortSignal // Додаємо цей аргумент
): Promise<Response<T>> {

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        sortBy: String(sortBy),
        order,
    });

    const url = `${baseUrl}${path}?${queryParams.toString()}`;
    try{
        const response = await fetch(url,{ signal });
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
