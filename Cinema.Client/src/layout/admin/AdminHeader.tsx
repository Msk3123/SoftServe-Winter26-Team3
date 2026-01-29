import { NavLink } from "react-router";
import Logo from "../../components/ui/Logo";
import styles from "./AdminHeader.module.css"

const AdminHeader = ()=>{
    return(
        <header className={styles.header}>
            <NavLink to="/home"><Logo size="small" sizeAuto={false}/></NavLink> 
        </header>
    )
};

export default AdminHeader;