
export interface Response<T extends {id:number}> {
    items: T[];
    totalCount:number;
    pageNumber: number;
    pageSize: number;
}