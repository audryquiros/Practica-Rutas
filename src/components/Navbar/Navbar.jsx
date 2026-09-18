import { useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useCurrency } from "../../context/CurrencyContext";
import "./Navbar.css";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const { t } = useTheme();
    const { moneda, cambiarMoneda } = useCurrency();
    const navigate = useNavigate();

    const userMenuRef = useRef(null);

    const esAdmin = user?.role === "admin";

    useEffect(() => {
        const cerrarMenuAlHacerClickAfuera = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                userMenuRef.current.removeAttribute("open");
            }
        };

        document.addEventListener(
            "mousedown",
            cerrarMenuAlHacerClickAfuera
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                cerrarMenuAlHacerClickAfuera
            );
        };
    }, []);

    const manejarLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="navbar">
            <div className="navbar-container">

                {/* LOGO */}
                <Link
                    to="/"
                    className="navbar-logo"
                    aria-label="Learnix"
                >
                    <img
                        src="/logo-icon.png"
                        alt="Learnix Logo"
                    />
                    <span>Learnix</span>
                </Link>

                {/* NAVEGACIÓN */}
                <nav className="navbar-links">

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `navbar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        {t("inicio")}
                    </NavLink>

                    {isAuthenticated && !esAdmin && (
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `navbar-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            {t("misCursos")}
                        </NavLink>
                    )}

                    {isAuthenticated && (
                        <NavLink
                            to="/test-vocacional"
                            className={({ isActive }) =>
                                `navbar-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            {t("testVocacional")}
                        </NavLink>
                    )}

                    {esAdmin && (
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `navbar-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            {t("administracion")}
                        </NavLink>
                    )}

                    <NavLink
                        to="/ayuda"
                        className={({ isActive }) =>
                            `navbar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        {t("ayuda")}
                    </NavLink>

                </nav>

                {/* MONEDA */}
                <button
                    type="button"
                    className="navbar-currency-button"
                    onClick={cambiarMoneda}
                    title={t("cambiarMoneda")}
                    aria-label={t("cambiarMoneda")}
                >
                    <span className="navbar-currency-symbol">
                        {moneda === "CRC" ? "₡" : "$"}
                    </span>

                    <span>
                        {moneda === "CRC" ? "CRC" : "USD"}
                    </span>
                </button>

                {/* USUARIO */}
                <div className="navbar-user">

                    {isAuthenticated && user ? (

                        <details
                            className="navbar-user-details"
                            ref={userMenuRef}
                        >
                            <summary className="navbar-user-button">

                                <span className="navbar-avatar">
                                    {user.nombre
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </span>

                                <span className="navbar-user-name">
                                    {user.nombre}
                                </span>

                                <span
                                    className="navbar-user-arrow"
                                    aria-hidden="true"
                                >
                                    ⌄
                                </span>

                            </summary>

                            <div className="navbar-user-dropdown">

                                <Link to="/perfil">
                                    {t("perfil")}
                                </Link>

                                <Link to="/configuracion">
                                    {t("configuracion")}
                                </Link>

                                <button
                                    type="button"
                                    onClick={manejarLogout}
                                >
                                    {t("cerrarSesion")}
                                </button>

                            </div>
                        </details>

                    ) : (

                        <Link
                            to="/login"
                            className="navbar-login"
                        >
                            {t("iniciarSesion")}
                        </Link>

                    )}

                </div>

            </div>
        </header>
    );
}

export default Navbar;