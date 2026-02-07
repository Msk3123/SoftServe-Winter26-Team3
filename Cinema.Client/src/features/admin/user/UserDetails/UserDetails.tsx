import { Outlet, useLoaderData } from "react-router";
import type { OrderShort } from "../../../../types/order.types";
import type { User } from "../../../../types/user.types";
import type { ColumnDef } from "../../../../types/common.types";
import { formatDate } from "../../../../helpers/dateHelpers";
import OrderStatusBadge from "../../../../components/OrderStatus/OrderStatusBadge";
import useQueryTable from "../../../../hooks/useQueryTable/useQueryTable";
import {getUserOrders } from "../../../../api/orderApi";
import Table from "../../../../components/Table/Table";
import styles from "./UserDetails.module.css"
import { useCallback, useMemo } from "react";
import type { FetchParams } from "../../../../types/api.types";
import Button from "../../../../components/Button/Button";

//(params)=>getUserOrders(user.id,params)
const UserDetails = ()=>{

    const user = useLoaderData() as User;

    const fetchOrders = useCallback(
        (params: FetchParams<OrderShort>|undefined) => getUserOrders(user.id, params),
        [user.id]
    );

    const {data,pagination,sortParams,actions} = useQueryTable<OrderShort>(fetchOrders);

    const columns:ColumnDef<OrderShort>[] = useMemo(()=>[
        { key: "id", title: "№" },
        { key:"orderDate",title: "Date",  render: (item)=>formatDate(item.orderDate)},
        { key:"totalAmount",title: "Total amount" ,render:(item)=>`${item.totalAmount} UAH`,},
        { key:"orderStatuses",title: "Status", render: (item) => <OrderStatusBadge orderStatus={item.orderStatuses}/>},
        {key:"actions",title:"",render:(item)=>(
            
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

    return (
    <>
    <div>
        <div className={styles.user}>
            User:
            <span className={styles.name}>
                {user.firstName} {user.lastName}
            </span>
        
            <span className={styles.email}>
            {user.email}
            </span>
        </div>
        
        <Table
            data={data??[]}
            columns={columns}
            handleSort={actions.toggleSort}
            pagination={pagination}
            sortParams={sortParams}
        />
        {data?.length === 0 && (
                <span className={styles.emptyMessage}>User has not made any orders yet</span>
            )}
    </div>
    <Outlet/>
    </>
    )

};

export default UserDetails;