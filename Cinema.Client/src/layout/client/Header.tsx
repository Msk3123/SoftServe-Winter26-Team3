import { NavLink } from "react-router";
import Logo from "../../components/ui/Logo";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import { jwtDecode } from "jwt-decode"; 

const Header = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<{ firstName: string; lastName: string; id: string } | null>(null);
    
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setIsLogged(true);
                setUser({
                    firstName: decoded.firstName || "User",
                    lastName: decoded.lastName || "",
                    id: decoded.nameid
                });
            } catch (e) {
                console.error("Invalid token");
                setIsLogged(false);
            }
        }
    }, []);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    const getInitials = () => {
        if (!user) return "?";
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLogged(false);
        setUser(null);
        closeMenu();
    };

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
                                        to={`/tickets/${user?.id}`}
                                        onClick={closeMenu}
                                        className={({ isActive }) => isActive ? `${styles.navlink} ${styles.active} ` : styles.navlink}
                                    >My Tickets</NavLink>
                                </li>
                                
                                <li className={styles.profileItem}>
                                    <NavLink to="/profile" className={styles.profileLink} onClick={closeMenu}>
                                        <div className={styles.avatar}>{getInitials()}</div>
                                        <span className={styles.userName}>{user?.firstName} {user?.lastName}</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <Button bgColor="var(--color-danger)" action={handleLogout}>
                                        Log out
                                    </Button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Button to="/auth/login" action={closeMenu}>
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