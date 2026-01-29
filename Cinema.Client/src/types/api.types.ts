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

export type FetchListFunction<T extends BaseEntity> = (
    params?: FetchParams<T>
) => Promise<PaginatedResponse<T>>;

export type FetchListByIdFunction<T extends BaseEntity> = (
    id: number | string,
    params?: FetchParams<T>
) => Promise<PaginatedResponse<T>>;

export type FetchOneFunction<T> = (
    id: number | string
) => Promise<SingleResponse<T>>;

export type PostFunction<T extends BaseEntity, TData = Partial<T>> = (
    data: TData
) => Promise<SingleResponse<T>>;

export type PutFunction<T extends BaseEntity> = (
    id: number | string,
    data: T
) => Promise<void>;

export type PatchFunction<T extends BaseEntity> = (
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
