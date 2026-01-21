import styles from "./PageNotFound.module.css"
import Button from "../../../components/Button/Button";


const PageNotFound : React.FC = ()=>{
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>404</h1>
                <div className={styles.divider}></div>
                <h2 className={styles.title}>End of the Reel</h2>
                <p className={styles.text}>
                    This session has already ended, and the lights in the hall have faded to black.
                    Don't worry, we still have many interesting premieres on our {' '}
                    <Button to="/" variant="outline">
                        home page
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default PageNotFound;