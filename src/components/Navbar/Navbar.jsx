import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-container">

                <NavLink to="/" className="navbar-logo">
                    <span className="logo-mark">P</span>
                    <span className="logo-text">Learnix</span>
                </NavLink>

                <nav className="navbar-menu">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/ayuda"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Ayuda
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "nav-link login-link active" : "nav-link login-link"
                        }
                    >
                        Iniciar sesión
                    </NavLink>

                    <NavLink
                        to="/registro"
                        className="nav-register"
                    >
                        Crear cuenta
                    </NavLink>
                </nav>

            </div>
        </header>
    );
}

export default Navbar;