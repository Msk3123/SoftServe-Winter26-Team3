import Logo from "../../components/ui/Logo";
import styles from "./AdminHeader.module.css"

const AdminHeader : React.FC = ()=>{
    return(
        <header className={styles.header}>
            <Logo />
        </header>
    )
};

export default AdminHeader;