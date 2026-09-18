import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    const esAdmin = user?.role === "admin";

    const manejarLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="navbar">
            <div className="navbar-container">

                <Link
                    to="/"
                    className="navbar-logo"
                >
                    Learnix
                </Link>

                <nav className="navbar-links">

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                    >
                        Inicio
                    </NavLink>

                    {isAuthenticated && (
                        <NavLink
                            to="/test-vocacional"
                            className={({ isActive }) =>
                                `navbar-link ${isActive ? "active" : ""}`
                            }
                        >
                            Test vocacional
                        </NavLink>
                    )}

                    {esAdmin && (
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `navbar-link ${isActive ? "active" : ""}`
                            }
                        >
                            Administración
                        </NavLink>
                    )}

                    <NavLink
                        to="/ayuda"
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                    >
                        Ayuda
                    </NavLink>

                </nav>

                <div className="navbar-user">

                    {isAuthenticated && user ? (
                        <div className="navbar-user-menu">

                            <details className="navbar-user-details">

                                <summary className="navbar-user-button">

                                    <span className="navbar-avatar">
                                        {user.nombre
                                            ?.charAt(0)
                                            ?.toUpperCase() || "U"}
                                    </span>

                                    <span className="navbar-user-name">
                                        {user.nombre}
                                    </span>

                                    <span className="navbar-user-arrow">
                                        ˅
                                    </span>

                                </summary>

                                <div className="navbar-user-dropdown">

                                    <Link to="/perfil">
                                        Perfil
                                    </Link>

                                    <Link to="/configuracion">
                                        Configuración
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={manejarLogout}
                                    >
                                        Cerrar sesión
                                    </button>

                                </div>

                            </details>

                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="navbar-login"
                        >
                            Iniciar sesión
                        </Link>
                    )}

                </div>

            </div>
        </header>
    );
}

export default Navbar;