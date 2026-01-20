import { Outlet } from "react-router";
import styles from "./ClientPageLayout.module.css"
import Header from "./Header";

const ClientPageLayout: React.FC = ()=>{
    return(
        <div className={styles.layoutContainer}>
            <Header />
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export default ClientPageLayout;