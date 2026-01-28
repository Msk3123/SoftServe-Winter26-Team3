import { Outlet } from "react-router-dom";
import  styles from  "./AdminUsersPage.module.css"

const AdminUsersPage : React.FC = ()=>{
    return(<div className={styles.container}>
                AdminUsersPage
                <Outlet />
            </div>)
};

export default AdminUsersPage;