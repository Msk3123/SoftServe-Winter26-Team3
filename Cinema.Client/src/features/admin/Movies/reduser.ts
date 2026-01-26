
import type { ReduserAction, ReduserState } from "./reduser.types";

export function reducer<T extends { id: number; }>(state: ReduserState<T>, action: ReduserAction<T>):ReduserState<T>{
    switch (action.type) {
        case "fetch_start":
            return { ...state, loading: true, error: null };

        case "fetch_success":
            return {
                ...state,
                loading: false,
                data: action.payload.items,
                totalCount: action.payload.totalCount,
        };
        case "set_data":
            return{
                ...state,
                data:action.payload,
            };
        case "delete_item":
            return{
                ...state,
                data:state.data?.filter(item=> item.id != action.payload),
                totalCount: state.totalCount - 1,
            };
        case "create_item":
            return{
                ...state,
                data: state.data ? [...state.data, action.payload] : [action.payload],
                totalCount: state.totalCount + 1,
            };

        case "fetch_error":
            return { ...state, loading: false, error: action.payload };

        case "set_page":
            return { ...state, currentPage: action.payload };

        case "set_page_size":
            return { ...state, pageSize: action.payload, currentPage: 1 };

        case "set_sort":
            return {
                ...state,
                sortBy: action.payload.sortBy,
                order: action.payload.order,
                currentPage: 1,
            };
        case 'toggle_sort': {
            const key = action.payload;
            const isSameKey = state.sortBy === key;

            let nextOrder: "asc" | "desc" = "asc";
            let nextKey = key;

            if (isSameKey) {
                if (state.order === "asc") {
                nextOrder = "desc";
            } else {
                nextKey = "id";
                nextOrder = "asc";
        }
    }

    return {
        ...state,
        sortBy: nextKey,
        order: nextOrder,
        currentPage: 1
    };
}

        default:
            return state;
    }
}