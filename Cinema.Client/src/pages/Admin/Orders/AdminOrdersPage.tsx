import { Outlet } from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";
import type { OrderShort } from "../../../types/order.types";
import { getAllOrders } from "../../../api/orderApi";
import { parseDate } from "../../../helpers/dateHelpers";
import Badge from "../../../components/Badge/Badge";
import { getStatusConfig } from "../../../helpers/getStatusConfig";

const AdminOrdersPage = ()=>{

    const {data,pagination,sortParams,status,actions} = useQueryTable<OrderShort>(getAllOrders);
    
    const columns:ColumnDef<OrderShort>[] = [
        { key: "id", title: "№" },
        { key:"orderDate",title: "Date",  render: (item)=>parseDate(new Date(item.orderDate))},
        { key:"totalAmount",title: "Total amount" ,render:(item)=>`${item.totalAmount} UAH`,},
        { key:"orderStatuses",title: "Status", render: (item) => {

            const config = getStatusConfig(item.orderStatuses);
            console.log(config)

            return (
                <Badge
                    color={config.color}
                    textColor={config.textColor}
                    border={false}
                    size="md"
                >
                    {config.label}
                </Badge>
            );
    },},
    ];

    return (<>
                <AdminTablePage
                    columns={columns}
                    tableData={{ data, pagination, sortParams, status }}
                    tableActions={actions}
                    isActions={false}
                />
                <Outlet context={{createItem:actions.createItem,editItem:actions.editItem}}/>
            </>)
};

export default AdminOrdersPage;