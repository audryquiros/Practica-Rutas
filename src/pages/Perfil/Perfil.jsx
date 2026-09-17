import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import {
    actualizarUsuario,
    obtenerUsuarioPorEmail
} from "../../services/usuariosService";

import "./Perfil.css";

function Perfil() {
    const {
        user,
        login
    } = useAuth();

    const { t } = useTheme();

    const [editando, setEditando] =
        useState(false);

    const [nombre, setNombre] =
        useState(
            user?.nombre || ""
        );

    const [email, setEmail] =
        useState(
            user?.email || ""
        );

    const [error, setError] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);

    const iniciarEdicion = () => {

        setNombre(
            user?.nombre || ""
        );

        setEmail(
            user?.email || ""
        );

        setError("");
        setMensaje("");
        setEditando(true);
    };

    const cancelarEdicion = () => {

        setNombre(
            user?.nombre || ""
        );

        setEmail(
            user?.email || ""
        );

        setError("");
        setEditando(false);
    };

    const manejarGuardar =
        async (event) => {

            event.preventDefault();

            setError("");
            setMensaje("");

            if (
                !nombre.trim() ||
                !email.trim()
            ) {

                setError(
                    t(
                        "completaTodosCampos"
                    )
                );

                return;
            }

            try {

                setGuardando(true);

                const usuarioConEseEmail =
                    await obtenerUsuarioPorEmail(
                        email.trim()
                    );

                if (
                    usuarioConEseEmail &&
                    Number(
                        usuarioConEseEmail.id
                    ) !==
                    Number(user.id)
                ) {

                    setError(
                        t(
                            "otroUsuarioCorreo"
                        )
                    );

                    return;
                }

                const usuarioActualizado =
                    await actualizarUsuario(
                        user.id,
                        {
                            nombre:
                                nombre.trim(),
                            email:
                                email
                                    .trim()
                                    .toLowerCase()
                        }
                    );

                login({
                    ...user,
                    ...usuarioActualizado
                });

                setMensaje(
                    t(
                        "informacionActualizada"
                    )
                );

                setEditando(false);

            } catch (error) {

                console.error(error);

                setError(
                    t(
                        "errorActualizar"
                    )
                );

            } finally {

                setGuardando(false);
            }
        };

    return (
        <main className="perfil-page">

            <div className="perfil-container">

                <section className="perfil-header">

                    <div>

                        <span className="perfil-label">
                            {t("miCuenta")}
                        </span>

                        <h1>
                            {t("perfil")}
                        </h1>

                        <p>
                            {t(
                                "consultaActualiza"
                            )}
                        </p>

                    </div>

                </section>

                <section className="perfil-card">

                    <div className="perfil-avatar">
                        {user?.nombre
                            ?.charAt(0)
                            .toUpperCase() ||
                            "U"}
                    </div>

                    <div className="perfil-main-info">

                        <span className="perfil-role">
                            {user?.role === "admin"
                                ? t(
                                    "administrador"
                                )
                                : t(
                                    "estudiante"
                                )}
                        </span>

                        <h2>
                            {user?.nombre ||
                                "Usuario"}
                        </h2>

                        <p>
                            {user?.email ||
                                "Sin correo registrado"}
                        </p>

                    </div>

                </section>

                <section className="perfil-details">

                    <div className="perfil-section-header">

                        <div>

                            <span className="perfil-section-label">
                                {t(
                                    "informacionPersonal"
                                )}
                            </span>

                            <h2>
                                {t(
                                    "datosCuenta"
                                )}
                            </h2>

                        </div>

                        {!editando && (
                            <button
                                type="button"
                                className="perfil-edit-button"
                                onClick={
                                    iniciarEdicion
                                }
                            >
                                {t(
                                    "editarInformacion"
                                )}
                            </button>
                        )}

                    </div>

                    {!editando ? (

                        <div className="perfil-info-grid">

                            <div className="perfil-info-item">

                                <span>
                                    {t(
                                        "nombreCompleto"
                                    )}
                                </span>

                                <strong>
                                    {user?.nombre ||
                                        "No disponible"}
                                </strong>

                            </div>

                            <div className="perfil-info-item">

                                <span>
                                    {t(
                                        "correoElectronico"
                                    )}
                                </span>

                                <strong>
                                    {user?.email ||
                                        "No disponible"}
                                </strong>

                            </div>

                            <div className="perfil-info-item">

                                <span>
                                    {t(
                                        "idUsuario"
                                    )}
                                </span>

                                <strong>
                                    {user?.id ||
                                        "No disponible"}
                                </strong>

                            </div>

                            <div className="perfil-info-item">

                                <span>
                                    {t(
                                        "tipoCuenta"
                                    )}
                                </span>

                                <strong>
                                    {user?.role ===
                                    "admin"
                                        ? t(
                                            "administrador"
                                        )
                                        : t(
                                            "estudiante"
                                        )}
                                </strong>

                            </div>

                        </div>

                    ) : (

                        <form
                            className="perfil-edit-form"
                            onSubmit={
                                manejarGuardar
                            }
                        >

                            <div className="perfil-edit-grid">

                                <div className="perfil-form-group">

                                    <label htmlFor="perfil-nombre">
                                        {t(
                                            "nombreCompleto"
                                        )}
                                    </label>

                                    <input
                                        id="perfil-nombre"
                                        type="text"
                                        value={nombre}
                                        onChange={(
                                            event
                                        ) =>
                                            setNombre(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    />

                                </div>

                                <div className="perfil-form-group">

                                    <label htmlFor="perfil-email">
                                        {t(
                                            "correoElectronico"
                                        )}
                                    </label>

                                    <input
                                        id="perfil-email"
                                        type="email"
                                        value={email}
                                        onChange={(
                                            event
                                        ) =>
                                            setEmail(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            {error && (
                                <p className="perfil-error">
                                    {error}
                                </p>
                            )}

                            <div className="perfil-edit-actions">

                                <button
                                    type="button"
                                    className="perfil-cancel-button"
                                    onClick={
                                        cancelarEdicion
                                    }
                                    disabled={
                                        guardando
                                    }
                                >
                                    {t(
                                        "cancelar"
                                    )}
                                </button>

                                <button
                                    type="submit"
                                    className="perfil-save-button"
                                    disabled={
                                        guardando
                                    }
                                >
                                    {guardando
                                        ? t(
                                            "guardando"
                                        )
                                        : t(
                                            "guardarCambios"
                                        )}
                                </button>

                            </div>

                        </form>
                    )}

                    {mensaje && (
                        <p className="perfil-success">
                            {mensaje}
                        </p>
                    )}

                </section>

            </div>

        </main>
    );
}

export default Perfil;