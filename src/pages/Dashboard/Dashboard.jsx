import {
    useEffect,
    useState
} from "react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import {
    obtenerMatriculasPorUsuario
} from "../../services/matriculasService";

import {
    obtenerCursoPorId
} from "../../services/cursosService";

import CourseProgressModal from "../../components/CourseProgressModal/CourseProgressModal";

import "./Dashboard.css";

function Dashboard() {
    const { user } = useAuth();
    const { t } = useTheme();

    const [cursos, setCursos] =
        useState([]);

    const [cursoSeleccionado, setCursoSeleccionado] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const cargarCursosUsuario =
            async () => {

                if (!user?.id) {

                    setLoading(false);

                    return;
                }

                try {

                    setLoading(true);
                    setError("");

                    const matriculas =
                        await obtenerMatriculasPorUsuario(
                            user.id
                        );

                    const cursosUsuario =
                        await Promise.all(
                            matriculas.map(
                                async (
                                    matricula
                                ) => {

                                    const curso =
                                        await obtenerCursoPorId(
                                            matricula.cursoId
                                        );

                                    return {
                                        ...curso,
                                        progreso:
                                            matricula.progreso,
                                        estado:
                                            matricula.estado,
                                        temasVistos:
                                            matricula.temasVistos ||
                                            [],
                                        tareasCompletadas:
                                            matricula.tareasCompletadas ||
                                            []
                                    };
                                }
                            )
                        );

                    setCursos(
                        cursosUsuario
                    );

                } catch (error) {

                    console.error(error);

                    setError(
                        t(
                            "noSePudieronCargarTusCursos"
                        )
                    );

                } finally {

                    setLoading(false);
                }
            };

        cargarCursosUsuario();

    }, [user, t]);

    const cursosCompletados =
        cursos.filter(
            (curso) =>
                curso.progreso === 100
        ).length;

    const progresoGeneral =
        cursos.length > 0
            ? Math.round(
                cursos.reduce(
                    (
                        total,
                        curso
                    ) =>
                        total +
                        curso.progreso,
                    0
                ) / cursos.length
            )
            : 0;

    return (
        <main className="dashboard-page">

            <div className="dashboard-container">

                <section className="dashboard-header">

                    <div>

                        <span className="dashboard-label">
                            {t("miEspacio")}
                        </span>

                        <h1>
                            {t("bienvenida")},{" "}
                            {user?.nombre ||
                                "Usuario"}
                        </h1>

                        <p>
                            {t(
                                "consultaProgreso"
                            )}
                        </p>

                    </div>

                </section>

                <section className="dashboard-stats">

                    <article className="dashboard-stat">

                        <span>
                            {t(
                                "cursosMatriculados"
                            )}
                        </span>

                        <strong>
                            {cursos.length}
                        </strong>

                    </article>

                    <article className="dashboard-stat">

                        <span>
                            {t(
                                "cursosCompletados"
                            )}
                        </span>

                        <strong>
                            {cursosCompletados}
                        </strong>

                    </article>

                    <article className="dashboard-stat">

                        <span>
                            {t(
                                "progresoGeneral"
                            )}
                        </span>

                        <strong>
                            {progresoGeneral}%
                        </strong>

                    </article>

                </section>

                <section className="dashboard-courses">

                    <div className="dashboard-section-header">

                        <h2>
                            {t(
                                "misCursosTitulo"
                            )}
                        </h2>

                        <p>
                            {t(
                                "cursosActualmente"
                            )}
                        </p>

                    </div>

                    {loading && (
                        <p className="dashboard-message">
                            {t(
                                "cargandoTusCursos"
                            )}
                        </p>
                    )}

                    {error && (
                        <p className="dashboard-message dashboard-error">
                            {error}
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        cursos.length === 0 && (

                            <div className="empty-courses">

                                <h3>
                                    {t(
                                        "aunNoCursos"
                                    )}
                                </h3>

                                <p>
                                    {t(
                                        "exploraOferta"
                                    )}
                                </p>

                            </div>
                        )}

                    {!loading &&
                        !error &&
                        cursos.length > 0 && (

                            <div className="dashboard-course-grid">

                                {cursos.map(
                                    (curso) => (

                                        <article
                                            className="dashboard-course-card"
                                            key={curso.id}
                                        >

                                            <span className="course-category">
                                                {curso.categoria}
                                            </span>

                                            <h3>
                                                {curso.nombre}
                                            </h3>

                                            <p className="course-professor">
                                                {curso.profesor}
                                            </p>

                                            <div className="course-progress-header">

                                                <span>
                                                    {t(
                                                        "progreso"
                                                    )}
                                                </span>

                                                <strong>
                                                    {curso.progreso}%
                                                </strong>

                                            </div>

                                            <div className="course-progress">

                                                <div
                                                    className="course-progress-bar"
                                                    style={{
                                                        width:
                                                            `${curso.progreso}%`
                                                    }}
                                                ></div>

                                            </div>

                                            <span className="course-status">
                                                {curso.estado}
                                            </span>

                                            <button
                                                className="dashboard-course-button"
                                                onClick={() =>
                                                    setCursoSeleccionado(
                                                        curso
                                                    )
                                                }
                                            >
                                                {t(
                                                    "verCurso"
                                                )}
                                            </button>

                                        </article>
                                    )
                                )}

                            </div>
                        )}

                </section>

            </div>

            <CourseProgressModal
                curso={
                    cursoSeleccionado
                }
                onClose={() =>
                    setCursoSeleccionado(
                        null
                    )
                }
            />

        </main>
    );
}

export default Dashboard;