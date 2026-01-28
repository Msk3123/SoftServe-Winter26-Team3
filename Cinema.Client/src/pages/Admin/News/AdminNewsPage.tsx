import { Outlet } from "react-router-dom";
import  styles from  "./AdminNewsPage.module.css"

const AdminNewsPage : React.FC = ()=>{
    return(<div className={styles.container}>
                AdminNewsPage
                <Outlet />
            </div>)
};

export default AdminNewsPage;