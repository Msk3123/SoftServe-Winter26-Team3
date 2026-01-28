import { Outlet } from "react-router-dom";
import  styles from  "./AdminSessionsPage.module.css"

const AdminSessionsPage : React.FC = ()=>{
    return(<div className={styles.container}>
                AdminSessionsPage
                <Outlet />
            </div>)
};

export default AdminSessionsPage;