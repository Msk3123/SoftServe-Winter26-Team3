import type { DeleteFunction, FetchPaginatedListFunction, FetchOneFunction, PostFunction, PutFunction, PatchFunction} from "../types/api.types";
import type { CreateSessionsBatch, Session, SessionCreate, SessionShort } from "../types/session.types";
import { defaultParams, deleteItem, getItem, getPaginatedData, patchItem, postItem, putItem } from "./api";


export const getAllSessions: FetchPaginatedListFunction<SessionShort> = async (params = defaultParams) => {
    return await getPaginatedData<SessionShort>("session", params);
};

export const getSession: FetchOneFunction<Session> = async (id) => {
    return await getItem("session", id);
};

export const postSession: PostFunction<SessionCreate, Session> = async (data) => {
    return await postItem("session", data);
};

export const putSession: PutFunction<SessionCreate> = async (id, data) => {
    return await putItem("session", id, data);
};

export const patchSession: PatchFunction<SessionCreate> = async (id, data) => {
    return await patchItem("session", id, data);
};

export const deleteSession: DeleteFunction = async (id) => {
    return deleteItem("session", id);
};

export const createSessionBatch:PostFunction<CreateSessionsBatch,{message: string;}> = async (data)=>{
    return await postItem("session/batch", data);
}