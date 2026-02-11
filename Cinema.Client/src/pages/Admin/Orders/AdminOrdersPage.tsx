import { Outlet } from "react-router";
import AdminTablePage from "../../../features/admin/components/AdminTablePage/AdminTablePage";
import type { ColumnDef } from "../../../types/common.types";
import useQueryTable from "../../../hooks/useQueryTable/useQueryTable";
import type { OrderShort } from "../../../types/order.types";
import { getAllOrders } from "../../../api/orderApi";
import Button from "../../../components/Button/Button";
import styles from "../../../features/admin/components/AdminTablePage/AdminTablePage.module.css"
import OrderStatusBadge from "../../../components/OrderStatus/OrderStatusBadge";
import { formatDate } from "../../../helpers/dateHelpers";
import { useMemo } from "react";
const AdminOrdersPage = ()=>{

    const {data,pagination,sortParams,status,actions} = useQueryTable<OrderShort>(getAllOrders);
    
    const columns:ColumnDef<OrderShort>[] =useMemo(()=> [
        { key: "id", title: "№" },
        { key:"orderDate",title: "Date",  render: (item)=>formatDate(item.orderDate)},
        { key:"totalAmount",title: "Total amount" ,render:(item)=>`${item.totalAmount} UAH`,},
        { key:"orderStatuses",title: "Status", render: (item) => <OrderStatusBadge orderStatus={item.orderStatuses}/>},
        { key:"actions",title:"",render:(item)=>(
            
            <div className={styles.actionCell}>
                <Button
                    to={`${item.id}/details`}
                    variant="fill"
                    bgColor="var(--button-save)"
                    color="var(--text-main)"
                >
                    Details
                </Button>
            </div>)
        }
    ],[]);

    return (<>
                <AdminTablePage
                    columns={columns}
                    tableData={{ data, pagination, sortParams, status }}
                    tableActions={actions}
                    isActions={false}
                    isCreate={false}
                />
                <Outlet context={{createItem:actions.createItem, editItem:actions.editItem}}/>
            </>)
};

export default AdminOrdersPage;