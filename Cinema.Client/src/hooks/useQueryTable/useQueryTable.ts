import { useEffect, useMemo, useReducer } from "react";
import { reducer } from "./reducer";
import type { BaseEntity, FetchPaginatedListFunction} from "../../types/api.types";
import type { ReducerState } from "./reducer.types";
import {defaultInitialState } from "./reducer.initial";


export default function useQueryTable<T extends BaseEntity>(
    fetchFn: FetchPaginatedListFunction<T>,
    initialState: ReducerState<T> = defaultInitialState as unknown as ReducerState<T>,// add 'as unknown' before the final cast, for type compatibility
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
    }, [state.currentPage, state.pageSize, state.sortBy, state.order,fetchFn,state.refreshTrigger]);

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
        editItem:(item:T)=>
            dispatch({type:"edit_item",payload:item}),
        deleteItem:(id:number|string)=>
            dispatch({type:"delete_item",payload:id}),
        toggleSort: (key: keyof T) =>
            dispatch({ type: 'toggle_sort', payload: key }),
        refresh: () => dispatch({ type: "refresh" }),
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
