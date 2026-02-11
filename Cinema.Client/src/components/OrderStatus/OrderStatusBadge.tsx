import { getStatusConfig } from "../../helpers/getStatusConfig";
import type { OrderStatus } from "../../types/order.types"
import Badge from "../Badge/Badge";

interface OrderStatusBadge{
    orderStatus: OrderStatus
}

const OrderStatusBadge = ({orderStatus}:OrderStatusBadge)=>{
    const config = getStatusConfig(orderStatus);

            return (
                <Badge
                    color={config.color}
                    textColor={config.textColor}
                    border={false}
                    size="sm"
                >
                    {config.label}
                </Badge>
            );
}
export default OrderStatusBadge;