
import type { FetchOneFunction, PostFunction, FetchPaginatedListByIdFunction, FetchPaginatedListFunction} from "../types/api.types";
import type { OrderCreate, OrderDetails, OrderShort} from "../types/order.types";
import { defaultParams, getItem, getPaginatedData, postItem, } from "./api";

export const getAllOrders: FetchPaginatedListFunction<OrderShort> = async (params = defaultParams) => {
    return await getPaginatedData<OrderShort>("order", params);
};

export const  getUserOrders:FetchPaginatedListByIdFunction<OrderShort> = async (id,params = defaultParams ) => {
        return await getPaginatedData<OrderShort>(`order/user/${id}`, params);
};

export const getOrder:FetchOneFunction<OrderDetails> = async (id)=>{
    return await getItem("order",id);
}
export const postOrder:PostFunction<OrderCreate,OrderShort>= async(data)=>{
    return await postItem("order",data);
}

