import { NavLink } from "react-router";
import styles from "./Sidebar.module.css";

const navItems = [
        { label: "Movies", path: "/admin/movies" },
        { label: "Sessions", path: "/admin/sessions" },
        { label: "Halls", path: "/admin/halls" },
        { label: "News", path: "/admin/news" },
        { label: "Orders", path: "/admin/orders" },
    ];

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <ul className={styles.navList}>
                {navItems.map((item) => (
                    <li key={item.path} className={styles.navItem}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                            }
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;