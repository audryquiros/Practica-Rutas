import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="navbar">
            <div className="navbar-container">

                <NavLink to="/" className="navbar-logo">
                    <span className="logo-mark">P</span>

                    <span className="logo-text">
                        Learnix
                    </span>
                </NavLink>

                <nav className="navbar-menu">

                    <div className="navbar-links">

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Inicio
                        </NavLink>

                        {isAuthenticated && (
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                Mis cursos
                            </NavLink>
                        )}

                        <NavLink
                            to="/ayuda"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Ayuda
                        </NavLink>

                        {isAuthenticated && (
                            <NavLink
                                to="/perfil"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                Perfil
                            </NavLink>
                        )}

                    </div>

                    <div className="navbar-actions">

                        {!isAuthenticated ? (
                            <>
                                <NavLink
                                    to="/login"
                                    className="nav-login"
                                >
                                    Iniciar sesión
                                </NavLink>

                                <NavLink
                                    to="/registro"
                                    className="nav-register"
                                >
                                    Crear cuenta
                                </NavLink>
                            </>
                        ) : (
                            <button
                                className="nav-logout"
                                onClick={handleLogout}
                            >
                                Cerrar sesión
                            </button>
                        )}

                    </div>

                </nav>

            </div>
        </header>
    );
}

export default Navbar;