import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import { obtenerCursos } from "../../services/cursosService";
import {
    obtenerPromociones
} from "../../services/promocionesService";
import {
    obtenerUsuarios
} from "../../services/usuariosService";

import "./Admin.css";

function Admin() {
    const { t } = useTheme();
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
                    t("errorCargarAdministracion")
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
                        {t("administracion").toUpperCase()}
                    </span>

                    <h1>
                        {t("panelAdministracion")}
                    </h1>

                    <p>
                        {t("adminDescripcion")}
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
                            {t("cursos").toUpperCase()}
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : cursos.length}
                        </strong>

                        <p>
                            {t("cursosDisponibles")}
                        </p>
                    </article>

                    <article className="admin-stat-card">
                        <span>
                            {t("usuarios").toUpperCase()}
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : usuarios.length}
                        </strong>

                        <p>
                            {t("cuentasRegistradas")}
                        </p>
                    </article>

                    <article className="admin-stat-card">
                        <span>
                            {t("promociones").toUpperCase()}
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : promocionesActivas.length}
                        </strong>

                        <p>
                            {t("promocionesActivas")}
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
                                {t("cursos")}
                            </h2>

                            <p>
                                {t("crearEditarEliminarCursos")}
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
                                {t("promociones")}
                            </h2>

                            <p>
                                {t("crearAdministrarPromociones")}
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
                                {t("usuarios")}
                            </h2>

                            <p>
                                {t("consultaEditaEliminaCuentas")}
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