import { useEffect, useState } from "react";

import { obtenerUsuarios } from "../../services/usuariosService";

import "./Usuarios.css";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                setLoading(true);
                setError("");

                const usuariosObtenidos =
                    await obtenerUsuarios();

                setUsuarios(usuariosObtenidos);
            } catch (error) {
                console.error(error);

                setError(
                    "No se pudieron cargar los usuarios."
                );
            } finally {
                setLoading(false);
            }
        };

        cargarUsuarios();
    }, []);

    return (
        <main className="usuarios-page">
            <div className="usuarios-container">

                <section className="usuarios-header">
                    <span className="usuarios-label">
                        USUARIOS
                    </span>

                    <h1>
                        Gestión de usuarios
                    </h1>

                    <p>
                        Consulta los usuarios registrados
                        en la plataforma.
                    </p>
                </section>

                <section className="usuarios-card">

                    <div className="usuarios-card-header">
                        <div>
                            <span className="usuarios-section-label">
                                CUENTAS REGISTRADAS
                            </span>

                            <h2>
                                Usuarios de Learnix
                            </h2>
                        </div>

                        {!loading && (
                            <span className="usuarios-count">
                                {usuarios.length}{" "}
                                {usuarios.length === 1
                                    ? "usuario"
                                    : "usuarios"}
                            </span>
                        )}
                    </div>

                    {loading && (
                        <p className="usuarios-message">
                            Cargando usuarios...
                        </p>
                    )}

                    {error && (
                        <p className="usuarios-message usuarios-error">
                            {error}
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        usuarios.length > 0 && (

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
                                                    <span
                                                        className={
                                                            usuario.role ===
                                                            "admin"
                                                                ? "usuario-role admin"
                                                                : "usuario-role"
                                                        }
                                                    >
                                                        {usuario.role ===
                                                        "admin"
                                                            ? "Administrador"
                                                            : "Usuario"}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>

                            </table>

                        </div>
                    )}

                    {!loading &&
                        !error &&
                        usuarios.length === 0 && (

                        <p className="usuarios-message">
                            No hay usuarios registrados.
                        </p>
                    )}

                </section>

            </div>
        </main>
    );
}

export default Usuarios;