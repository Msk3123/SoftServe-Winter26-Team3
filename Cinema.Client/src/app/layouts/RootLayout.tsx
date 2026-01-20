import { Link, Outlet } from 'react-router'

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
                <Link to="/sessions" className="nav__item">
                    Сеанси
                </Link>
                <Link to="/news" className="nav__item">
                    Новини
                </Link>
                <Link to="/auth" className="nav__item">
                    Регістрація
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
