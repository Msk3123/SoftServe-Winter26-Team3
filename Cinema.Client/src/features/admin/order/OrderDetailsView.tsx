import { useLoaderData } from "react-router";
import type { OrderDetails } from "../../../types/order.types";
import styles from "./OrderDetailsView.module.css"
import OrderStatusBadge from "../../../components/OrderStatus/OrderStatusBadge";
import { formatDate } from "../../../helpers/dateHelpers";
import type { Session } from "../../../types/session.types";
import type { UserDetails } from "../../../types/user.types";
import AdminSessionCard from "../../../components/AdminSessionCard/AdminSessionCard";
import { getSeatColor } from "../halls/helpers/getSeatColor";

interface LoaderResponse{
  order:OrderDetails;
  session:Session;
  user:UserDetails;
}

const OrderDetailsView = ()=>{

    const {order,session,user} = useLoaderData() as LoaderResponse;
    console.log(order);
    console.log(session);
    console.log(user);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.date}>{formatDate(order.orderDate)}</span>
        <span className={styles.status}><OrderStatusBadge orderStatus={order.orderStatuses}/></span>
      </div>

      <AdminSessionCard session={session} />

      <div className={styles.user}>
        User: 
        <span className={styles.name}>
          {user.firstName} {user.lastName}
        </span>
        
        <span className={styles.email}>
          {user.email}
        </span>
      </div>

      <h3>Tickets:</h3>
      <div className={styles.tickets}>
        {order.tickets.map(t => {
          
          let typeColor = getSeatColor(t.ticketTypeName)
          
          if(typeColor=="transparent") typeColor = "var(--text-main-dark)";

          return  <div key={t.id} className={styles.ticketRow}>
            <span>
              Row {t.row}, Seat {t.seatNo} ·
              <span style={{color:typeColor,margin:" 0 0.2em"}}>{t.ticketTypeName}</span>
            </span>
            <span>{t.price} ₴</span>
          </div>
        })}
      </div>

      <div></div>

      <div className={styles.total}>
        <span>Total: </span>
        <span>{order.totalAmount} ₴</span>
      </div>
    </div>
  );
};

export default OrderDetailsView;