import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import Header from "../client/Header";
import Footer from "../client/Footer";

const AuthLayout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.page}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AuthLayout;