import type { FetchOneFunction } from "../types/api.types";
import type { UserDetails } from "../types/user.types";
import { getItem } from "./api";

export const getUser: FetchOneFunction<UserDetails> = async (id) => {
    return await getItem("users", id);
};