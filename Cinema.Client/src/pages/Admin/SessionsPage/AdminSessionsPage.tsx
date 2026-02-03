import  styles from  "./AdminSessionsPage.module.css"
import { Outlet } from "react-router-dom";

const AdminSessionsPage : React.FC = ()=>{
    return(<div className={styles.container}>
                AdminSessionsPage
                <Outlet />
            </div>)
};

export default AdminSessionsPage;