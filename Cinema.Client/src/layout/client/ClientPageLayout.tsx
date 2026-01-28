import { Outlet } from "react-router-dom";
import styles from "./ClientPageLayout.module.css"
import Header from "./Header";
import Footer from "./Footer";

const ClientPageLayout: React.FC = ()=>{
    return(
        <div className={`${styles.layoutContainer} client`}>
            <Header />
            <main className={styles.contentWrapper}>
                <Outlet></Outlet>
            </main>
            <Footer />
        </div>
    )
}

export default ClientPageLayout;