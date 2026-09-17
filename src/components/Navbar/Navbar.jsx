import { useState } from "react";
import {
    Link,
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

    const manejarLogout = () => {
        logout();
        setMenuAbierto(false);

        navigate("/", {
            replace: true
        });
    };

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    const esAdministrador =
        isAuthenticated &&
        user?.role === "admin";

    return (
        <header className="navbar">
            <div className="navbar-container">

                {/* LOGO */}

                <Link
                    to="/"
                    className="navbar-logo"
                    onClick={cerrarMenu}
                >
                    <span className="logo-text">
                        Learnix
                    </span>
                </Link>

                {/* NAVEGACIÓN */}

                <nav className="navbar-links">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        {t("inicio")}
                    </NavLink>

                    {/* SOLO USUARIOS NORMALES */}

                    {isAuthenticated &&
                        user?.role === "usuario" && (
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `nav-link ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }
                            >
                                {t("misCursos")}
                            </NavLink>
                        )}

                    {/* SOLO ADMINISTRADOR */}

                    {esAdministrador && (
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >
                            {t("administracion")}
                        </NavLink>
                    )}

                    <NavLink
                        to="/ayuda"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        {t("ayuda")}
                    </NavLink>

                </nav>

                {/* ACCIONES */}

                <div className="navbar-actions">

                    {/* USUARIO NO AUTENTICADO */}

                    {!isAuthenticated && (
                        <>
                            <Link
                                to="/login"
                                className="nav-login"
                            >
                                {t("iniciarSesion")}
                            </Link>

                            <Link
                                to="/registro"
                                className="nav-register"
                            >
                                {t("crearCuenta")}
                            </Link>
                        </>
                    )}

                    {/* USUARIO AUTENTICADO */}

                    {isAuthenticated && (
                        <div className="profile-menu">

                            <button
                                type="button"
                                className="profile-trigger"
                                onClick={() =>
                                    setMenuAbierto(
                                        (actual) =>
                                            !actual
                                    )
                                }
                                aria-expanded={
                                    menuAbierto
                                }
                            >
                                <span className="profile-avatar">
                                    {user?.nombre
                                        ?.charAt(0)
                                        ?.toUpperCase() ||
                                        "U"}
                                </span>

                                <span className="profile-trigger-name">
                                    {user?.nombre ||
                                        "Usuario"}
                                </span>

                                <span className="profile-trigger-arrow">
                                    {menuAbierto
                                        ? "⌃"
                                        : "⌄"}
                                </span>
                            </button>

                            {menuAbierto && (
                                <div className="profile-dropdown">

                                    <div className="profile-dropdown-header">

                                        <strong>
                                            {user?.nombre}
                                        </strong>

                                        <span>
                                            {user?.email}
                                        </span>

                                    </div>

                                    <div className="profile-dropdown-divider" />

                                    {/* PERFIL */}

                                    <Link
                                        to="/perfil"
                                        className="profile-dropdown-item"
                                        onClick={
                                            cerrarMenu
                                        }
                                    >
                                        {t("perfil")}
                                    </Link>

                                    {/* CONFIGURACIÓN */}

                                    <Link
                                        to="/perfil/configuracion"
                                        className="profile-dropdown-item"
                                        onClick={
                                            cerrarMenu
                                        }
                                    >
                                        {t("configuracion")}
                                    </Link>

                                    {/* USUARIOS SOLO ADMIN */}

                                    {esAdministrador && (
                                        <Link
                                            to="/dashboard/usuarios"
                                            className="profile-dropdown-item profile-dropdown-users"
                                            onClick={
                                                cerrarMenu
                                            }
                                        >
                                            Usuarios
                                        </Link>
                                    )}

                                    <div className="profile-dropdown-divider" />

                                    {/* CERRAR SESIÓN */}

                                    <button
                                        type="button"
                                        className="profile-dropdown-item profile-dropdown-logout"
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

            </div>
        </header>
    );
}

export default Navbar;