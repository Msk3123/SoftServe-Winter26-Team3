import { Outlet } from "react-router-dom";
import  styles from  "./AdminHallsPage.module.css"

const AdminHallsPage : React.FC = ()=>{
    return(<div className={styles.container}>
                Halls Page
                <Outlet />
            </div>)
};

export default AdminHallsPage;