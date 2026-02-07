import type { LoaderFunctionArgs } from "react-router";
import { getOrder } from "../../../api/orderApi";
import { getSession } from "../../../api/sessionApi";
import { getUser } from "../../../api/userApi";

const orderDetailsLoader = async ({ params }:LoaderFunctionArgs) => {
    if (!params.orderId) {
        throw new Error("Order ID is required");
    }

    const order = await getOrder(params.orderId);
    const session = await getSession(order.sessionId);
    const user = await getUser(order.userId);
    
    return {order,session,user};
};

export default orderDetailsLoader;