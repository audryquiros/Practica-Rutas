import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

import { obtenerCursos } from "../../services/cursosService";
import {
    obtenerMatriculasPorUsuario
} from "../../services/matriculasService";
import {
    obtenerPromocionesActivas
} from "../../services/promocionesService";

import CourseCard from "../../components/CourseCard/CourseCard";
import CourseModal from "../../components/CourseModal/CourseModal";

import "./Home.css";

function Home() {
    const {
        user,
        isAuthenticated,
        loadingAuth
    } = useAuth();

    const { t } = useLanguage();

    const [cursos, setCursos] = useState([]);
    const [promociones, setPromociones] = useState([]);

    const [cursoSeleccionado, setCursoSeleccionado] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (loadingAuth) return;

        const cargarDatos = async () => {
            try {
                setLoading(true);
                setError("");

                // Cargar cursos y promociones
                // independientemente de si hay sesión
                const [
                    cursosDisponibles,
                    promocionesActivas
                ] = await Promise.all([
                    obtenerCursos(),
                    obtenerPromocionesActivas()
                ]);

                console.log(
                    "Promociones activas:",
                    promocionesActivas
                );

                console.log(
                    "Cursos disponibles:",
                    cursosDisponibles
                );

                setPromociones(
                    promocionesActivas || []
                );

                let cursosParaMostrar =
                    cursosDisponibles;

                // Si el usuario está autenticado,
                // ocultamos solamente los cursos
                // que ya tiene matriculados.
                if (
                    isAuthenticated &&
                    user?.id
                ) {
                    const matriculas =
                        await obtenerMatriculasPorUsuario(
                            user.id
                        );

                    const cursosMatriculados =
                        matriculas.map(
                            (matricula) =>
                                String(
                                    matricula.cursoId
                                )
                        );

                    cursosParaMostrar =
                        cursosDisponibles.filter(
                            (curso) =>
                                !cursosMatriculados.includes(
                                    String(curso.id)
                                )
                        );
                }

                setCursos(
                    cursosParaMostrar
                );

            } catch (error) {
                console.error(
                    "Error cargando Home:",
                    error
                );

                setError(
                    t(
                        "noSePudieronCargarCursos"
                    )
                );

            } finally {
                setLoading(false);
            }
        };

        cargarDatos();

    }, [
        loadingAuth,
        isAuthenticated,
        user,
        t
    ]);

    const obtenerPromocionDelCurso = (cursoId) => {
        if (!promociones.length) {
            return null;
        }

        const promocionEncontrada =
            promociones.find(
                (promocion) =>
                    String(promocion.cursoId) ===
                    String(cursoId)
            );

        return promocionEncontrada || null;
    };

    return (
        <main className="home-page">

            <div className="home-container">

                <section className="home-header">

                    <span className="home-label">
                        {t("formacionOnline")}
                    </span>

                    <h1>
                        {t("aprendeAlgoNuevo")}
                    </h1>

                    <p>
                        {t("exploraCursos")}
                    </p>

                </section>

                <section className="home-courses">

                    <div className="home-section-header">

                        <div>

                            <span className="home-section-label">
                                {t("cursosDisponibles")}
                            </span>

                            <h2>
                                {isAuthenticated
                                    ? t(
                                        "continuaAprendiendo"
                                    )
                                    : t(
                                        "encuentraCurso"
                                    )}
                            </h2>

                        </div>

                        {!loading && (
                            <span className="home-course-count">

                                {cursos.length}{" "}

                                {cursos.length === 1
                                    ? t("curso")
                                    : t("cursos")}

                            </span>
                        )}

                    </div>

                    {loading && (
                        <p className="home-message">
                            {t("cargandoCursos")}
                        </p>
                    )}

                    {error && (
                        <p className="home-message home-error">
                            {error}
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        cursos.length === 0 && (

                            <div className="home-empty">

                                <h3>
                                    {t("noHayCursos")}
                                </h3>

                                <p>
                                    {t("todosCursos")}
                                </p>

                            </div>
                        )}

                    {!loading &&
                        !error &&
                        cursos.length > 0 && (

                            <div className="home-course-grid">

                                {cursos.map(
                                    (curso) => {

                                        const promocion =
                                            obtenerPromocionDelCurso(
                                                curso.id
                                            );

                                        return (
                                            <CourseCard
                                                key={curso.id}
                                                curso={curso}
                                                promocion={
                                                    promocion
                                                }
                                                onVerInfo={
                                                    setCursoSeleccionado
                                                }
                                            />
                                        );
                                    }
                                )}

                            </div>
                        )}

                </section>

            </div>

            <CourseModal
                curso={cursoSeleccionado}
                promocion={obtenerPromocionDelCurso(cursoSeleccionado?.id)}
                onClose={() =>
                    setCursoSeleccionado(null)
                }
            />

        </main>
    );
}

export default Home;