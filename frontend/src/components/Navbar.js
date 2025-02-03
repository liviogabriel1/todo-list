import { Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ token, handleLogout, darkMode, toggleDarkMode }) => {
    return (
        <nav className="navbar glass">
            <div className="container navbar__content">
                <Link to="/" className="navbar__brand">
                    <svg className="navbar__logo" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                    <span>TaskFlow</span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="theme-toggle"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? (
                            <FiSun className="w-5 h-5" />
                        ) : (
                            <FiMoon className="w-5 h-5" />
                        )}
                    </button>

                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="button button--error"
                        >
                            Sair
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="button button--text">
                                Entrar
                            </Link>
                            <Link to="/register" className="button button--primary">
                                Criar conta
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;