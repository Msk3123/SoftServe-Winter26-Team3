import type { ReducerState } from "./reducer.types";

// We use { id: number } here for the initial template, but the hook will enforce the type.
export const defaultInitialState: ReducerState<{ id: number|string }>= {
    data: undefined,
    loading: false,
    error: null,

    currentPage: 1,
    pageSize: 10,
    totalCount: 0,

    sortBy: "id",
    order: "asc",
};