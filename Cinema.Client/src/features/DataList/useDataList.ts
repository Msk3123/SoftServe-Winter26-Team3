import { useEffect, useMemo, useReducer } from "react";
import { reducer } from "./reduser";
import type { Response } from "../../types/api.types";
import type { ReduserState } from "./reduser.types";
type FetchParams<T> = {
    page: number;
    pageSize: number;
    sortBy: keyof T;
    order: "asc" | "desc";
};

export default function useDataList<T extends{id:number}>(
    fetchFn: (params: FetchParams<T>) => Promise<Response<T>>,
    initialState: ReduserState<T>
) {
    const [state, dispatch] = useReducer(reducer<T>, initialState);

    useEffect(() => {
        const fetchMovies = async() => {
            dispatch({ type: "fetch_start" });

            try {
                const res = await fetchFn({
                    page: state.currentPage,
                    pageSize: state.pageSize,
                    sortBy: state.sortBy,
                    order: state.order,
                });

            dispatch({
                type: "fetch_success",
                payload: {
                    items: res.items,
                    totalCount: res.totalCount,
                },
            });
        } catch (e) {
            dispatch({
                type: "fetch_error",
                payload: (e as Error).message,
            });
        }
    };

        fetchMovies();
    }, [state.currentPage, state.pageSize, state.sortBy, state.order,fetchFn]);

    const actions = useMemo(() => ({
        setPage: (page: number) =>
            dispatch({ type: "set_page", payload: page }),

        setPageSize: (size: number) =>
            dispatch({ type: "set_page_size", payload: size }),

        setSort: (sortBy: keyof T, order: "asc" | "desc") =>
            dispatch({
                type: "set_sort",
                payload: { sortBy, order },
            }),
        setData:(items:readonly T[])=>
            dispatch({type:"set_data",payload:items}),
        createItem:(item:T)=>
            dispatch({type:"create_item",payload:item}),
        deleteItem:(id:number)=>
            dispatch({type:"delete_item",payload:id}),
        toggleSort: (key: keyof T) =>
            dispatch({ type: 'toggle_sort', payload: key }),
    }),[]);
    return {
        data: state.data,
        pagination: {
            current: state.currentPage,
            total: state.totalCount,
            pageSize: state.pageSize
        },
        status: {
            isLoading: state.loading,
            error: state.error
        },
        sortParams: {
            sortBy: state.sortBy,
            order: state.order,
        },
        actions
    };
}
