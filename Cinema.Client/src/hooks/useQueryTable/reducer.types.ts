export type ReducerState<T extends {id:number|string}> = {
    data?:  readonly T[];
    loading: boolean;
    error: string | null;

    currentPage: number;
    pageSize: number;
    totalCount: number;

    refreshTrigger:number;

    sortBy: keyof T;
    order: "asc" | "desc";
};

export type ReducerAction<T extends {id:number|string}> =
    | { type: "fetch_start" }
    | {
        type: "fetch_success";
        payload: { items: readonly T[]; totalCount: number };
        }
    | { type: "fetch_error"; payload: string }
    | {type:"set_data"; payload:readonly T[]}
    | {type:"delete_item"; payload: number|string}
    | {type:"create_item"; payload: T}
    | {type:"edit_item"; payload: T}
    | { type: "set_page"; payload: number }
    | { type: "set_page_size"; payload: number }
    | {
        type: "set_sort";
        payload: { sortBy: keyof T; order: "asc" | "desc" };
        }
    | { type: 'toggle_sort'; payload: keyof T }
    | { type:"refresh" };
