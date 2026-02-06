
import type { FetchOneFunction, PostFunction, FetchPaginatedListByIdFunction} from "../types/api.types";
import type { OrderCreate, OrderShort} from "../types/order.types";
import { defaultParams, getItem, getPaginatedData, postItem, } from "./api";



export const  getUserOrders:FetchPaginatedListByIdFunction<OrderShort> = async (id,params = defaultParams ) => {
        return await getPaginatedData<OrderShort>(`order/user/${id}`, params);
};

export const getOrder:FetchOneFunction<OrderShort> = async (id)=>{
    return await getItem("order",id);
}
export const postOrder:PostFunction<OrderCreate,OrderShort>= async(data)=>{
    return await postItem("order",data);
}

