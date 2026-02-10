import { NavLink, useNavigate } from "react-router";
import Logo from "../../components/ui/Logo";
import Button from "../../components/Button/Button"; 
import styles from "./AdminHeader.module.css";

const AdminHeader = () => {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.clear();
        navigate("/auth/login");
    };

    return (
        <header className={styles.Header}>
            <NavLink to="/home">
                <Logo size="small" sizeAuto={false}/>
            </NavLink> 
            

            <div className={styles.Actions}>
                <Button bgColor="var(--color-danger)" action={handleLogout}>
                    Log out
                </Button>
            </div>
        </header>
    );
};

export default AdminHeader;