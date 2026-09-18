import {
    useEffect,
    useMemo,
    useState
} from "react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

import {
    obtenerCursos,
    obtenerCursoPorId
} from "../../services/cursosService";

import {
    obtenerMatriculasPorUsuario
} from "../../services/matriculasService";

import CourseProgressModal from "../../components/CourseProgressModal/CourseProgressModal";

import "./Dashboard.css";

function Dashboard() {
    const {
        user
    } = useAuth();

    const { tema } = useTheme();
    const { idioma, t } = useLanguage();

    const [
        cursos,
        setCursos
    ] = useState([]);

    const [
        cursoSeleccionado,
        setCursoSeleccionado
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");

    const idiomaIngles =
        idioma === "en";

    const temaOscuro =
        tema === "oscuro";


    /* =====================================================
       CARGAR MIS CURSOS
    ===================================================== */

    const cargarCursos = async () => {
        try {
            setLoading(true);
            setError("");

            const [
                cursosDisponibles,
                matriculas
            ] = await Promise.all([
                obtenerCursos(),
                obtenerMatriculasPorUsuario(
                    user.id
                )
            ]);

            const cursosMatriculados =
                await Promise.all(
                    matriculas.map(
                        async (matricula) => {

                            const curso =
                                cursosDisponibles.find(
                                    (item) =>
                                        Number(item.id) ===
                                        Number(
                                            matricula.cursoId
                                        )
                                ) ||
                                await obtenerCursoPorId(
                                    matricula.cursoId
                                );

                            if (!curso) {
                                return null;
                            }

                            return {
                                ...curso,
                                ...matricula,
                                matriculaId:
                                    matricula.id,
                                progreso:
                                    Number(
                                        matricula.progreso ||
                                        0
                                    ),
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
                cursosMatriculados.filter(Boolean)
            );

        } catch (error) {

            console.error(
                "Error cargando mis cursos:",
                error
            );

            setError(
                t(
                    "noSePudieronCargarTusCursos"
                )
            );

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (user?.id) {
            cargarCursos();
        }
    }, [user?.id]);


    /* =====================================================
       ESTADÍSTICAS
    ===================================================== */

    const cursosCompletados =
        useMemo(
            () =>
                cursos.filter(
                    (curso) =>
                        Number(
                            curso.progreso
                        ) === 100 ||
                        curso.estado ===
                            "Completado"
                ).length,
            [cursos]
        );

    const progresoGeneral =
        useMemo(() => {

            if (cursos.length === 0) {
                return 0;
            }

            const total =
                cursos.reduce(
                    (
                        acumulado,
                        curso
                    ) =>
                        acumulado +
                        Number(
                            curso.progreso ||
                            0
                        ),
                    0
                );

            return Math.round(
                total /
                cursos.length
            );

        }, [cursos]);


    /* =====================================================
       TEXTO DE CURSO
    ===================================================== */

    const obtenerDatosCurso =
        (curso) => {

            return {
                nombre:
                    idiomaIngles &&
                    curso.nombre_en
                        ? curso.nombre_en
                        : curso.nombre,

                categoria:
                    idiomaIngles &&
                    curso.categoria_en
                        ? curso.categoria_en
                        : curso.categoria,

                duracion:
                    idiomaIngles &&
                    curso.duracion_en
                        ? curso.duracion_en
                        : curso.duracion
            };
        };


    /* =====================================================
       ACTUALIZAR DESDE MODAL
    ===================================================== */

    const actualizarCurso =
        (cursoActualizado) => {

            setCursos(
                (actuales) =>
                    actuales.map(
                        (curso) =>
                            Number(
                                curso.matriculaId
                            ) ===
                            Number(
                                cursoActualizado.matriculaId
                            )
                                ? cursoActualizado
                                : curso
                    )
            );
        };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (
            <main
                className={`dashboard-page ${
                    temaOscuro
                        ? "dashboard-dark"
                        : "dashboard-light"
                }`}
            >
                <div className="dashboard-container">

                    <div className="dashboard-heading">

                        <span className="dashboard-eyebrow">
                            {t("miEspacio")}
                        </span>

                        <h1>
                            {t("bienvenida")}
                        </h1>

                        <p>
                            {t(
                                "consultaProgreso"
                            )}
                        </p>

                    </div>

                    <div className="dashboard-loading">
                        <div className="dashboard-spinner"></div>

                        <span>
                            {t(
                                "cargandoTusCursos"
                            )}
                        </span>
                    </div>

                </div>
            </main>
        );
    }


    return (
        <main
            className={`dashboard-page ${
                temaOscuro
                    ? "dashboard-dark"
                    : "dashboard-light"
            }`}
        >
            <div className="dashboard-container">

                {/* =========================================
                   HEADER
                ========================================= */}

                <section className="dashboard-heading">

                    <span className="dashboard-eyebrow">
                        {t("miEspacio")}
                    </span>

                    <h1>
                        {t("bienvenida")},{" "}
                        {user?.nombre}
                    </h1>

                    <p>
                        {t(
                            "consultaProgreso"
                        )}
                    </p>

                </section>


                {/* =========================================
                   ERROR
                ========================================= */}

                {error && (
                    <div className="dashboard-error">
                        {error}
                    </div>
                )}


                {/* =========================================
                   ESTADÍSTICAS
                ========================================= */}

                <section className="dashboard-stats">

                    <article className="dashboard-stat-card">

                        <span>
                            {t(
                                "cursosMatriculados"
                            )}
                        </span>

                        <strong>
                            {cursos.length}
                        </strong>

                    </article>


                    <article className="dashboard-stat-card">

                        <span>
                            {t(
                                "cursosCompletados"
                            )}
                        </span>

                        <strong>
                            {cursosCompletados}
                        </strong>

                    </article>


                    <article className="dashboard-stat-card">

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


                {/* =========================================
                   MIS CURSOS
                ========================================= */}

                <section className="dashboard-courses-section">

                    <div className="dashboard-section-header">

                        <div>
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

                    </div>


                    {cursos.length === 0 ? (

                        <div className="dashboard-empty">

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

                    ) : (

                        <div className="dashboard-courses-grid">

                            {cursos.map(
                                (curso) => {

                                    const datos =
                                        obtenerDatosCurso(
                                            curso
                                        );

                                    const completado =
                                        Number(
                                            curso.progreso
                                        ) === 100 ||
                                        curso.estado ===
                                            "Completado";

                                    return (
                                        <article
                                            className="dashboard-course-card"
                                            key={
                                                curso.matriculaId
                                            }
                                        >

                                            <span className="dashboard-course-category">
                                                {
                                                    datos.categoria
                                                }
                                            </span>


                                            <h3>
                                                {
                                                    datos.nombre
                                                }
                                            </h3>


                                            <p className="dashboard-course-professor">
                                                {
                                                    curso.profesor
                                                }
                                            </p>


                                            <div className="dashboard-progress-header">

                                                <span>
                                                    {t(
                                                        "progreso"
                                                    )}
                                                </span>

                                                <strong>
                                                    {
                                                        Number(
                                                            curso.progreso ||
                                                            0
                                                        )
                                                    }%
                                                </strong>

                                            </div>


                                            <div className="dashboard-progress-bar">

                                                <div
                                                    className="dashboard-progress-fill"
                                                    style={{
                                                        width: `${Math.min(
                                                            100,
                                                            Math.max(
                                                                0,
                                                                Number(
                                                                    curso.progreso ||
                                                                    0
                                                                )
                                                            )
                                                        )}%`
                                                    }}
                                                />

                                            </div>


                                            <span
                                                className={`dashboard-status ${
                                                    completado
                                                        ? "completed"
                                                        : ""
                                                }`}
                                            >
                                                {completado
                                                    ? t(
                                                        "completado"
                                                    )
                                                    : t(
                                                        "activo"
                                                    )}
                                            </span>


                                            <button
                                                type="button"
                                                className="dashboard-course-button"
                                                onClick={() =>
                                                    setCursoSeleccionado(
                                                        curso
                                                    )
                                                }
                                            >
                                                {completado
                                                    ? t(
                                                        "verCurso"
                                                    )
                                                    : t(
                                                        "continuarCurso"
                                                    )}
                                            </button>

                                        </article>
                                    );
                                }
                            )}

                        </div>

                    )}

                </section>

            </div>


            {/* =============================================
               MODAL DE PROGRESO
            ============================================= */}

            <CourseProgressModal
                curso={
                    cursoSeleccionado
                }
                onClose={() =>
                    setCursoSeleccionado(
                        null
                    )
                }
                onUpdated={
                    actualizarCurso
                }
            />

        </main>
    );
}

export default Dashboard;