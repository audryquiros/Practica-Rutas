import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { obtenerCursos } from "../../services/cursosService";
import {
    obtenerPromociones
} from "../../services/promocionesService";
import {
    obtenerUsuarios
} from "../../services/usuariosService";

import "./Admin.css";

function Admin() {
    const [cursos, setCursos] = useState([]);
    const [promociones, setPromociones] =
        useState([]);
    const [usuarios, setUsuarios] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                setError("");

                const [
                    cursosObtenidos,
                    promocionesObtenidas,
                    usuariosObtenidos
                ] = await Promise.all([
                    obtenerCursos(),
                    obtenerPromociones(),
                    obtenerUsuarios()
                ]);

                setCursos(cursosObtenidos);
                setPromociones(
                    promocionesObtenidas
                );
                setUsuarios(
                    usuariosObtenidos
                );
            } catch (error) {
                console.error(error);

                setError(
                    "No se pudieron cargar los datos de administración."
                );
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    const promocionesActivas =
        promociones.filter(
            (promocion) =>
                promocion.activa
        );

    return (
        <main className="admin-page">
            <div className="admin-container">

                <section className="admin-header">
                    <span className="admin-label">
                        ADMINISTRACIÓN
                    </span>

                    <h1>
                        Panel de administración
                    </h1>

                    <p>
                        Gestiona los cursos,
                        promociones y usuarios
                        de Learnix desde un solo
                        lugar.
                    </p>
                </section>

                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}

                <section className="admin-stats">

                    <article className="admin-stat-card">
                        <span>
                            CURSOS
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : cursos.length}
                        </strong>

                        <p>
                            Cursos disponibles
                        </p>
                    </article>

                    <article className="admin-stat-card">
                        <span>
                            USUARIOS
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : usuarios.length}
                        </strong>

                        <p>
                            Cuentas registradas
                        </p>
                    </article>

                    <article className="admin-stat-card">
                        <span>
                            PROMOCIONES
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : promocionesActivas.length}
                        </strong>

                        <p>
                            Promociones activas
                        </p>
                    </article>

                </section>

                <section className="admin-actions">

                    <Link
                        to="/admin/cursos"
                        className="admin-action-card"
                    >
                        <span className="admin-action-number">
                            01
                        </span>

                        <div>
                            <h2>
                                Cursos
                            </h2>

                            <p>
                                Crear, editar y
                                eliminar cursos
                                de Learnix.
                            </p>
                        </div>

                        <span className="admin-action-arrow">
                            →
                        </span>
                    </Link>

                    <Link
                        to="/admin/promociones"
                        className="admin-action-card"
                    >
                        <span className="admin-action-number">
                            02
                        </span>

                        <div>
                            <h2>
                                Promociones
                            </h2>

                            <p>
                                Crea descuentos y
                                administra las
                                promociones.
                            </p>
                        </div>

                        <span className="admin-action-arrow">
                            →
                        </span>
                    </Link>

                    <Link
                        to="/dashboard/usuarios"
                        className="admin-action-card"
                    >
                        <span className="admin-action-number">
                            03
                        </span>

                        <div>
                            <h2>
                                Usuarios
                            </h2>

                            <p>
                                Consulta, edita y
                                elimina cuentas.
                            </p>
                        </div>

                        <span className="admin-action-arrow">
                            →
                        </span>
                    </Link>

                </section>

            </div>
        </main>
    );
}

export default Admin;