export interface BaseEntity {
    id: number | string;
}

export interface ApiResponse<T extends BaseEntity> {
    items: T[];
    totalCount:number;
    pageNumber: number;
    pageSize: number;
}


export type FetchParams<T extends BaseEntity> = {
    page: number;
    pageSize: number;
    sortBy: keyof T;
    order: "asc" | "desc";
};

export type FetchFunction<T extends BaseEntity> = (params?: FetchParams<T>) => Promise<ApiResponse<T>>

export type DeleteFunction=(id: number|string)=>Promise<boolean | undefined>;