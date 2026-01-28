import { Outlet } from "react-router";
import  styles from  "./AuthLayout.module.css"

const AuthLayout = ()=>{
    return(<div className={styles.container}>
                AuthLayout
                <Outlet />
            </div>)
};

export default AuthLayout;