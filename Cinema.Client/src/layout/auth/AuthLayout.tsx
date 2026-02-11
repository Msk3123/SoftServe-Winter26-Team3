import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import Header from "../client/Header";
import Footer from "../client/Footer";

const AuthLayout = () => { 
    return (
        <div className={styles.Layout}>
            <Header />
            <main className={styles.Page}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AuthLayout;