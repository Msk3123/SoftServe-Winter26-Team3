import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import styles from "./AdminPageLayout.module.css"
import AdminHeader from "./AdminHeader";

const AdminPageLayout: React.FC = ()=>{
    return(
        <div className={`${styles.layoutContainer} admin`}>
            <AdminHeader />
            <div className={styles.contentWrapper}>
                <Sidebar/>
                <main className={styles.mainContent}>
                    <Outlet></Outlet>
                </main>
            </div>
            
        </div>
    )
}

export default AdminPageLayout;