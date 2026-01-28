import { Link, Outlet } from 'react-router-dom'

const RootLayout = () => (
    <div className="app-shell">
        <header className="topbar">
            <Link to="/" className="brand">
                Cinema
            </Link>
            <nav className="nav">
                <Link to="/" className="nav__item">
                    Головна
                </Link>
                <Link to="/auth/login" className="nav__item">
                    Вхід
                </Link>
                <Link to="/auth/signup" className="nav__item">
                    Реєстрація
                </Link>
            </nav>
        </header>
        <main className="page">
            <Outlet />
        </main>
        <footer className="footer">© Cinema, {new Date().getFullYear()}</footer>
    </div>
)

export default RootLayout
