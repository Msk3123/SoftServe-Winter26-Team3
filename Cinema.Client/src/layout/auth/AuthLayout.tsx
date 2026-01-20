import { Outlet } from "react-router";
import  styles from  "./AuthLayout.module.css"

const AuthLayout : React.FC = ()=>{
    return(<div className={styles.container}>
                AuthLayout
                <Outlet />
            </div>)
};

export default AuthLayout;