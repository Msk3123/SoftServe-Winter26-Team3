import styles from "./AdminPageNotFound.module.css"
import Button from "../../../components/Button/Button";

const AdminPageNotFound : React.FC = ()=>{
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>404</h1>
                <div className={styles.divider}></div>

                <h2 className={styles.title}>Backstage Access Error</h2>

                <p className={styles.text}>
                    This administrative area is currently off the script.
                    Please return to your management dashboard to continue.
                </p>

                <div className={styles.actions}>
                    <Button to="/admin/" variant="text-only" className={styles.dashboardBtn} color="var(--text-dark)">
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminPageNotFound;