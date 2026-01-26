import { Outlet } from "react-router";
import  styles from  "./AdminOrdersPage.module.css"

const AdminOrdersPage : React.FC = ()=>{
    return(<div className={styles.container}>
                AdminOrdersPage
                <Outlet />
            </div>)
};

export default AdminOrdersPage;