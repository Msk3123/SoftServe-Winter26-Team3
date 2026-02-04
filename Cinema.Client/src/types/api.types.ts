export interface BaseEntity {
    id: number | string;
}

export interface PaginatedResponse<T extends BaseEntity> {
    items: T[];
    totalCount:number;
    pageNumber: number;
    pageSize: number;
}

export type SingleResponse<T> = T;

export type FetchParams<T extends BaseEntity> = {
    page: number;
    pageSize: number;
    sortBy: keyof T;
    order: "asc" | "desc";
};

export type FetchPaginatedListFunction<T extends BaseEntity> = (
    params?: FetchParams<T>
) => Promise<PaginatedResponse<T>>;

export type FetchPaginatedListByIdFunction<T extends BaseEntity> = (
    id: number | string,
    params?: FetchParams<T>
) => Promise<PaginatedResponse<T>>;

export type FetchListFunction<T extends BaseEntity> = () => Promise<T[]>;
export type FetchListByIdFunction<T extends BaseEntity> = ( id: number | string) => Promise<T[]>;

export type FetchOneFunction<T> = (
    id: number | string
) => Promise<SingleResponse<T>>;

export type PostFunction<TData,TResponse> = (
    data: TData
) => Promise<SingleResponse<TResponse>>;

export type PutFunction<T> = (
    id: number | string,
    data: T
) => Promise<void>;

export type PatchFunction<T> = (
    id: number | string,
    data: Partial<T>
)=>Promise<void>;

export type DeleteFunction=(id: number|string)=>Promise<boolean | undefined>;

export interface ValidationErrors {
    [key: string]: string[];
}

export class ApiError extends Error {
    statusCode: number;
    errors?: ValidationErrors;

    constructor(message: string, statusCode: number, errors?: ValidationErrors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = "ApiError";
    }
}
