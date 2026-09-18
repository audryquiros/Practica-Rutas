import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

import {
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
} from "../../services/usuariosService";

import "./Usuarios.css";

function Usuarios() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);

    const [usuarioEditando, setUsuarioEditando] =
        useState(null);

    const [formulario, setFormulario] = useState({
        nombre: "",
        email: "",
        password: "",
        role: "usuario"
    });

    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const cargarUsuarios = async () => {
        try {
            setLoading(true);

            const datos = await obtenerUsuarios();

            setUsuarios(datos);
        } catch (error) {
            console.error(error);

            setError(
                t("errorCargarUsuarios")
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const editarUsuario = (usuario) => {
        setUsuarioEditando(usuario);

        setFormulario({
            nombre: usuario.nombre || "",
            email: usuario.email || "",
            password: usuario.password || "",
            role: usuario.role || "usuario"
        });

        setError("");
        setMensaje("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const cambiarCampo = (event) => {
        const {
            name,
            value
        } = event.target;

        setFormulario((actual) => ({
            ...actual,
            [name]: value
        }));
    };

    const guardarUsuario = async (event) => {
        event.preventDefault();

        if (!usuarioEditando) {
            return;
        }

        setError("");
        setMensaje("");

        if (
            !formulario.nombre.trim() ||
            !formulario.email.trim() ||
            !formulario.password.trim()
        ) {
            setError(
                t("camposUsuarioObligatorios")
            );

            return;
        }

        try {
            setGuardando(true);

            await actualizarUsuario(
                usuarioEditando.id,
                {
                    nombre:
                        formulario.nombre.trim(),

                    email:
                        formulario.email.trim(),

                    password:
                        formulario.password,

                    role:
                        formulario.role
                }
            );

            setMensaje(
                t("usuarioActualizado")
            );

            setUsuarioEditando(null);

            await cargarUsuarios();
        } catch (error) {
            console.error(error);

            setError(
                t("errorActualizarUsuario")
            );
        } finally {
            setGuardando(false);
        }
    };

    const cancelarEdicion = () => {
        setUsuarioEditando(null);

        setError("");
        setMensaje("");
    };

    const borrarUsuario = async (usuario) => {
        if (
            String(usuario.id) ===
            String(user?.id)
        ) {
            setError(
                t("cuentaSesionNoEliminar")
            );

            return;
        }

        const confirmar =
            window.confirm(
                `¿Seguro que deseas eliminar a "${usuario.nombre}"?`
            );

        if (!confirmar) {
            return;
        }

        try {
            setError("");
            setMensaje("");

            await eliminarUsuario(
                usuario.id
            );

            setMensaje(
                t("usuarioEliminado")
            );

            await cargarUsuarios();
        } catch (error) {
            console.error(error);

            setError(
                t("errorEliminarUsuario")
            );
        }
    };

    return (
        <main className="usuarios-admin-page">
            <div className="usuarios-admin-container">

                {/* BOTÓN VOLVER */}
                <button
                    type="button"
                    className="usuarios-back-button"
                    onClick={() => navigate("/admin")}
                >
                    <span>←</span>
                    {t("volverPanel")}
                </button>

                <section className="usuarios-admin-header">
                    <span>
                        {t("administracion").toUpperCase()}
                    </span>

                    <h1>
                        {t("gestionUsuarios")}
                    </h1>

                    <p>
                        {t("gestionUsuariosDescripcion")}
                    </p>
                </section>

                {usuarioEditando && (
                    <section className="usuario-edit-card">

                        <div className="usuario-edit-header">
                            <div>
                                <span>
                                    {t("editarUsuario").toUpperCase()}
                                </span>

                                <h2>
                                    {
                                        usuarioEditando.nombre
                                    }
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    cancelarEdicion
                                }
                            >
                                {t("cancelar")}
                            </button>
                        </div>

                        <form
                            className="usuario-edit-form"
                            onSubmit={
                                guardarUsuario
                            }
                        >

                            <div className="usuario-form-grid">

                                <div className="usuario-field">
                                    <label>
                                        {t("nombre")}
                                    </label>

                                    <input
                                        name="nombre"
                                        value={
                                            formulario.nombre
                                        }
                                        onChange={
                                            cambiarCampo
                                        }
                                    />
                                </div>

                                <div className="usuario-field">
                                    <label>
                                        {t("correo")}
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            formulario.email
                                        }
                                        onChange={
                                            cambiarCampo
                                        }
                                    />
                                </div>

                                <div className="usuario-field">
                                    <label>
                                        {t("contrasena")}
                                    </label>

                                    <input
                                        name="password"
                                        value={
                                            formulario.password
                                        }
                                        onChange={
                                            cambiarCampo
                                        }
                                    />
                                </div>

                                <div className="usuario-field">
                                    <label>
                                        {t("rol")}
                                    </label>

                                    <select
                                        name="role"
                                        value={
                                            formulario.role
                                        }
                                        onChange={
                                            cambiarCampo
                                        }
                                    >
                                        <option value="usuario">
                                            {t("usuario")}
                                        </option>

                                        <option value="admin">
                                            {t("administradorRol")}
                                        </option>
                                    </select>
                                </div>

                            </div>

                            <div className="usuario-edit-footer">
                                <button
                                    type="submit"
                                    disabled={
                                        guardando
                                    }
                                >
                                    {guardando
                                        ? t("guardando")
                                        : t("guardarCambios")}
                                </button>
                            </div>

                        </form>

                    </section>
                )}

                {error && (
                    <p className="usuarios-error">
                        {error}
                    </p>
                )}

                {mensaje && (
                    <p className="usuarios-success">
                        {mensaje}
                    </p>
                )}

                <section className="usuarios-list-card">

                    <div className="usuarios-list-header">
                        <div>
                            <span>
                                {t("usuarios").toUpperCase()}
                            </span>

                            <h2>
                                {t("cuentasRegistradasTitulo")}
                            </h2>
                        </div>

                        <strong>
                            {usuarios.length}
                        </strong>
                    </div>

                    {loading ? (
                        <p className="usuarios-message">
                            {t("cargandoUsuarios")}
                        </p>
                    ) : (
                        <div className="usuarios-table-wrapper">

                            <table className="usuarios-table">
                                <thead>
                                    <tr>
                                        <th>
                                            {t("nombre")}
                                        </th>

                                        <th>
                                            {t("correo")}
                                        </th>

                                        <th>
                                            {t("rol")}
                                        </th>

                                        <th>
                                            {t("acciones")}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {usuarios.map(
                                        (usuario) => (
                                            <tr
                                                key={
                                                    usuario.id
                                                }
                                            >
                                                <td>
                                                    <strong>
                                                        {
                                                            usuario.nombre
                                                        }
                                                    </strong>
                                                </td>

                                                <td>
                                                    {
                                                        usuario.email
                                                    }
                                                </td>

                                                <td>
                                                    <span className="usuario-role">
                                                        {
                                                            usuario.role
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="usuario-actions">

                                                        <button
                                                            type="button"
                                                            className="usuario-edit-button"
                                                            onClick={() =>
                                                                editarUsuario(
                                                                    usuario
                                                                )
                                                            }
                                                        >
                                                            {t("editarUsuario")}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="usuario-delete-button"
                                                            disabled={
                                                                String(
                                                                    usuario.id
                                                                ) ===
                                                                String(
                                                                    user?.id
                                                                )
                                                            }
                                                            onClick={() =>
                                                                borrarUsuario(
                                                                    usuario
                                                                )
                                                            }
                                                        >
                                                            {t("eliminar")}
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>

                        </div>
                    )}

                </section>

            </div>
        </main>
    );
}

export default Usuarios;