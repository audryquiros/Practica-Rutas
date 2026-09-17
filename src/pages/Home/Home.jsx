import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import { obtenerCursos } from "../../services/cursosService";
import {
    obtenerMatriculasPorUsuario
} from "../../services/matriculasService";

import CourseCard from "../../components/CourseCard/CourseCard";
import CourseModal from "../../components/CourseModal/CourseModal";

import "./Home.css";

function Home() {
    const {
        user,
        isAuthenticated,
        loadingAuth
    } = useAuth();

    const { t } = useTheme();

    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (loadingAuth) return;

        const cargarCursos = async () => {
            try {
                setLoading(true);
                setError("");

                const cursosDisponibles =
                    await obtenerCursos();

                if (
                    !isAuthenticated ||
                    !user?.id
                ) {
                    setCursos(
                        cursosDisponibles
                    );

                    return;
                }

                const matriculas =
                    await obtenerMatriculasPorUsuario(
                        user.id
                    );

                const cursosMatriculados =
                    matriculas.map(
                        (matricula) =>
                            Number(
                                matricula.cursoId
                            )
                    );

                const cursosFiltrados =
                    cursosDisponibles.filter(
                        (curso) =>
                            !cursosMatriculados.includes(
                                Number(curso.id)
                            )
                    );

                setCursos(cursosFiltrados);

            } catch (error) {
                console.error(error);

                setError(
                    t(
                        "noSePudieronCargarCursos"
                    )
                );

            } finally {
                setLoading(false);
            }
        };

        cargarCursos();

    }, [
        loadingAuth,
        isAuthenticated,
        user,
        t
    ]);

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
                                    (curso) => (
                                        <CourseCard
                                            key={curso.id}
                                            curso={curso}
                                            onVerInfo={
                                                setCursoSeleccionado
                                            }
                                        />
                                    )
                                )}

                            </div>
                        )}

                </section>

            </div>

            <CourseModal
                curso={cursoSeleccionado}
                onClose={() =>
                    setCursoSeleccionado(null)
                }
            />

        </main>
    );
}

export default Home;