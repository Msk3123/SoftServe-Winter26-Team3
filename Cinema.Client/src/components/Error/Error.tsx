import Button from "../Button/Button";
import styles from "./Error.module.css";

interface ErrorProps {
    errorCode?: string;
    message?: string;
    title?: string;
    variant?: 'admin' | 'client';
}

const Error = ({
    errorCode = "Oops!",
    title = "An error occurred",
    message = "Something went wrong",
    variant = 'admin',
}: ErrorProps) => {
    
    const themeClass = variant === 'admin' ? styles.adminTheme : styles.clientTheme;

    return (
        <div className={`${styles.container} ${themeClass}`}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>{errorCode}</h1>
                <div className={styles.divider}></div>

                <h2 className={styles.title}>{title}</h2>

                <p className={styles.message}>
                    {message}
                </p>

                <div className={styles.actions}>
                    <Button
                        to=".."
                        variant="text-only"
                        className={styles.dashboardBtn}
                        color="var(--btn-text-color)"
                    >
                        Go back
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Error;