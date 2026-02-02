import { Outlet } from "react-router-dom";
import  styles from  "./AdminUsersPage.module.css"

const AdminUsersPage : React.FC = ()=>{
    return(<div className={styles.container}>
import { Outlet } from "react-router";
const AdminUsersPage= ()=>{
    return(<div >
                AdminUsersPage
                <Outlet />
            </div>)
};

export default AdminUsersPage;