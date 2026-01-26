import { useEffect, useMemo, useReducer } from "react";
import { getAllMovies } from "../../../api/movieApi";
import { reducer } from "./movies.reduser";
import { initialState } from "./movies.initial";
import type { MovieSortBy } from "./movies.types";
import type { MovieShort } from "../../../types/Movie.types";


export default function useMovies() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchMovies = async () => {
            dispatch({ type: "fetch_start" });

            try {
                const res = await getAllMovies({
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
    }, [state.currentPage, state.pageSize, state.sortBy, state.order]);

    const actions = useMemo(() => ({
         setPage: (page: number) =>
            dispatch({ type: "set_page", payload: page }),

        setPageSize: (size: number) =>
            dispatch({ type: "set_page_size", payload: size }),

        setSort: (sortBy: MovieSortBy, order: "asc" | "desc") =>
            dispatch({
                type: "set_sort",
                payload: { sortBy, order },
            }),
        setData:(items:readonly MovieShort[])=>
            dispatch({type:"set_data",payload:items}),
        createItem:(item:MovieShort)=>
            dispatch({type:"create_item",payload:item}),
        deleteItem:(id:number)=>
            dispatch({type:"delete_item",payload:id}),
        toggleSort: (key: "id" | "releaseDate" | "title") =>
            dispatch({ type: 'toggle_sort', payload: key }),
    }),[]);
    return {
        movies: state.data,
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
