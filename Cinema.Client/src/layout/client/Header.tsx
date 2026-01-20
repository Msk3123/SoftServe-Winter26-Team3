import { NavLink } from "react-router";
import Logo from "../../components/ui/Logo";
import styles from "./Header.module.css";

const Header : React.FC = ()=>{
    return(
        <header className={styles.header}>
            <Logo />
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <NavLink to="/sessions">Sessions</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/news">News</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default Header