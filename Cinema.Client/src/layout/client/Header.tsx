import { NavLink } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import styles from "./Header.module.css";
import { useState } from "react";
import Button from "../../components/Button/Button";

const Header: React.FC = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <NavLink to="/" onClick={closeMenu}><Logo /></NavLink>
            </div>

            <button
                className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`} 
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                <ul className={styles.navList}>
                    <li>
                        <NavLink
                            to="/sessions"
                            onClick={closeMenu}
                            className={({ isActive}) => isActive ? `${styles.navlink} ${styles.active}` : styles.navlink}>
                            Sessions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            onClick={closeMenu}
                            className={({ isActive }) => isActive ? `${styles.navlink} ${styles.active}` : styles.navlink}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/news"
                            onClick={closeMenu}
                            className={({ isActive }) => isActive ? `${styles.navlink} ${styles.active}` : styles.navlink}>
                            News
                        </NavLink>
                    </li>
                    
                    <div className={styles.authButtons}>
                        {isLogged ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/tickets/userId"
                                        onClick={closeMenu}
                                        className={({ isActive }) => isActive ? `${styles.navlink} ${styles.active} ` : styles.navlink}
                                    >My Tickets</NavLink>
                                </li>
                                <li>
                                    <Button bgColor="var(--color-danger)" action={() => { setIsLogged(false); closeMenu(); }}>
                                        Log out
                                    </Button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Button to="/auth/login" action={() => { setIsLogged(true); closeMenu(); }}>
                                        Login
                                    </Button>
                                </li>
                                <li>
                                    <Button to="/auth/signup" variant="outline" action={closeMenu}>
                                        Sign up
                                    </Button>
                                </li>
                            </>
                        )}
                    </div>
                </ul>
            </nav>

            {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
        </header>
    )
};

export default Header;