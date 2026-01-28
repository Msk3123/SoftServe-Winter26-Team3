import Logo from "../../components/ui/Logo";
import styles from "./AdminHeader.module.css"

const AdminHeader = ()=>{
    return(
        <header className={styles.header}>
            <Logo size="small" sizeAuto={false}/>
        </header>
    )
};

export default AdminHeader;