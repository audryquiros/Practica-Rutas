import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import {
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
} from "../../services/usuariosService";

import "./Usuarios.css";

function Usuarios() {
    const { user } = useAuth();

    const [usuarios, setUsuarios] =
        useState([]);

    const [usuarioEditando, setUsuarioEditando] =
        useState(null);

    const [formulario, setFormulario] =
        useState({
            nombre: "",
            email: "",
            password: "",
            role: "usuario"
        });

    const [loading, setLoading] =
        useState(true);

    const [guardando, setGuardando] =
        useState(false);

    const [error, setError] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const cargarUsuarios = async () => {
        try {
            setLoading(true);

            const datos =
                await obtenerUsuarios();

            setUsuarios(datos);
        } catch (error) {
            console.error(error);

            setError(
                "No se pudieron cargar los usuarios."
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
            nombre:
                usuario.nombre || "",

            email:
                usuario.email || "",

            password:
                usuario.password || "",

            role:
                usuario.role || "usuario"
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
                "Completa todos los campos."
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
                "Usuario actualizado correctamente."
            );

            setUsuarioEditando(null);

            await cargarUsuarios();
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo actualizar el usuario."
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

    const borrarUsuario = async (
        usuario
    ) => {
        if (
            String(usuario.id) ===
            String(user?.id)
        ) {
            setError(
                "No puedes eliminar la cuenta con la que tienes la sesión iniciada."
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
                "Usuario eliminado correctamente."
            );

            await cargarUsuarios();
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo eliminar el usuario."
            );
        }
    };

    return (
        <main className="usuarios-admin-page">
            <div className="usuarios-admin-container">

                <section className="usuarios-admin-header">
                    <span>
                        ADMINISTRACIÓN
                    </span>

                    <h1>
                        Gestión de usuarios
                    </h1>

                    <p>
                        Consulta y administra las cuentas
                        registradas en Learnix.
                    </p>
                </section>

                {usuarioEditando && (
                    <section className="usuario-edit-card">

                        <div className="usuario-edit-header">
                            <div>
                                <span>
                                    EDITAR USUARIO
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
                                Cancelar
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
                                        Nombre
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
                                        Correo
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
                                        Contraseña
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
                                        Rol
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
                                            Usuario
                                        </option>

                                        <option value="admin">
                                            Administrador
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
                                        ? "Guardando..."
                                        : "Guardar cambios"}
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
                                USUARIOS
                            </span>

                            <h2>
                                Cuentas registradas
                            </h2>
                        </div>

                        <strong>
                            {usuarios.length}
                        </strong>
                    </div>

                    {loading ? (
                        <p className="usuarios-message">
                            Cargando usuarios...
                        </p>
                    ) : (
                        <div className="usuarios-table-wrapper">

                            <table className="usuarios-table">
                                <thead>
                                    <tr>
                                        <th>
                                            Nombre
                                        </th>

                                        <th>
                                            Correo
                                        </th>

                                        <th>
                                            Rol
                                        </th>

                                        <th>
                                            Acciones
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
                                                            Editar
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
                                                            Eliminar
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