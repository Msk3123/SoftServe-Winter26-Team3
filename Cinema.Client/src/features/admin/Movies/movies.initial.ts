import type { MoviesState } from "./movies.types";

export const initialState: MoviesState = {
  data: undefined,
  loading: false,
  error: null,

  currentPage: 1,
  pageSize: 10,
  totalCount: 0,

  sortBy: "id",
  order: "asc",
};