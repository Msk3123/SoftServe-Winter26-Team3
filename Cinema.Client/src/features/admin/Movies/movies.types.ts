import type { MovieShort } from "../../../types/Movie.types";


export type MovieSortBy = "id" | "releaseDate" | "title" | "posterUrl";

export type MoviesState = {
    data?: readonly MovieShort[];
    loading: boolean;
    error: string | null;

    currentPage: number;
    pageSize: number;
    totalCount: number;

    sortBy: MovieSortBy;
    order: "asc" | "desc";
};

export type MoviesAction =
    | { type: "fetch_start" }
    | {
        type: "fetch_success";
        payload: { items: readonly MovieShort[]; totalCount: number };
        }
    | { type: "fetch_error"; payload: string }
    | {type:"set_data"; payload:readonly MovieShort[]}
    | {type:"delete_item"; payload: number}
    | {type:"create_item"; payload: MovieShort}
    | { type: "set_page"; payload: number }
    | { type: "set_page_size"; payload: number }
    | {
        type: "set_sort";
        payload: { sortBy: MovieSortBy; order: "asc" | "desc" };
        }
    | { type: 'toggle_sort'; payload: "id" | "releaseDate" | "title" };
