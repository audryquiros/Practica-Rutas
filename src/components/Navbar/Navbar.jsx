import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    NavLink,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import "./Navbar.css";

function Navbar() {
    const {
        user,
        isAuthenticated,
        logout
    } = useAuth();

    const { t } = useTheme();

    const navigate = useNavigate();

    const [menuAbierto, setMenuAbierto] =
        useState(false);

    const menuRef = useRef(null);

    const esAdmin =
        user?.role === "admin";

    useEffect(() => {
        const manejarClickFuera = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuAbierto(false);
            }
        };

        document.addEventListener(
            "mousedown",
            manejarClickFuera
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                manejarClickFuera
            );
        };
    }, []);

    const manejarLogout = () => {
        logout();
        setMenuAbierto(false);
        navigate("/");
    };

    const abrirPerfil = () => {
        setMenuAbierto(false);
        navigate("/perfil");
    };

    const abrirConfiguracion = () => {
        setMenuAbierto(false);
        navigate("/configuracion");
    };

    const inicial =
        user?.nombre
            ?.charAt(0)
            .toUpperCase() || "U";

    return (
        <header className="navbar">
            <div className="navbar-container">

                <NavLink
                    to="/"
                    className="navbar-logo"
                >
                    <span className="logo-mark">
                        P
                    </span>

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
                            {t("inicio")}
                        </NavLink>

                        {isAuthenticated && !esAdmin && (
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                {t("misCursos")}
                            </NavLink>
                        )}

                        {isAuthenticated && esAdmin && (
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                {t("administracion")}
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
                            {t("ayuda")}
                        </NavLink>

                    </div>

                    <div className="navbar-actions">

                        {!isAuthenticated ? (
                            <>
                                <NavLink
                                    to="/login"
                                    className="nav-login"
                                >
                                    {t("iniciarSesion")}
                                </NavLink>

                                <NavLink
                                    to="/registro"
                                    className="nav-register"
                                >
                                    {t("crearCuenta")}
                                </NavLink>
                            </>
                        ) : (

                            <div
                                className="profile-menu"
                                ref={menuRef}
                            >

                                <button
                                    type="button"
                                    className="profile-trigger"
                                    onClick={() =>
                                        setMenuAbierto(
                                            !menuAbierto
                                        )
                                    }
                                    aria-expanded={
                                        menuAbierto
                                    }
                                    aria-haspopup="menu"
                                >

                                    <span className="profile-avatar">
                                        {inicial}
                                    </span>

                                    <span className="profile-trigger-name">
                                        {user?.nombre ||
                                            "Usuario"}
                                    </span>

                                    <span
                                        className={
                                            menuAbierto
                                                ? "profile-arrow open"
                                                : "profile-arrow"
                                        }
                                    >
                                        ⌄
                                    </span>

                                </button>

                                {menuAbierto && (

                                    <div
                                        className="profile-dropdown"
                                        role="menu"
                                    >

                                        <div className="profile-dropdown-header">

                                            <span className="profile-dropdown-avatar">
                                                {inicial}
                                            </span>

                                            <div>

                                                <strong>
                                                    {user?.nombre ||
                                                        "Usuario"}
                                                </strong>

                                                <span>
                                                    {user?.email ||
                                                        ""}
                                                </span>

                                            </div>

                                        </div>

                                        <div className="profile-dropdown-divider"></div>

                                        <button
                                            type="button"
                                            className="profile-dropdown-item"
                                            onClick={
                                                abrirPerfil
                                            }
                                        >
                                            {t("perfil")}
                                        </button>

                                        <button
                                            type="button"
                                            className="profile-dropdown-item"
                                            onClick={
                                                abrirConfiguracion
                                            }
                                        >
                                            {t("configuracion")}
                                        </button>

                                        <div className="profile-dropdown-divider"></div>

                                        <button
                                            type="button"
                                            className="profile-dropdown-item logout-item"
                                            onClick={
                                                manejarLogout
                                            }
                                        >
                                            {t("cerrarSesion")}
                                        </button>

                                    </div>
                                )}

                            </div>
                        )}

                    </div>

                </nav>

            </div>
        </header>
    );
}

export default Navbar;