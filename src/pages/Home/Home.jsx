import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { obtenerCursos } from "../../services/cursosService";
import { obtenerMatriculasPorUsuario } from "../../services/matriculasService";
import CourseCard from "../../components/CourseCard/CourseCard";
import "./Home.css";

function Home() {
    const {
        user,
        isAuthenticated,
        loadingAuth
    } = useAuth();

    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Esperamos a que AuthContext termine
        // de recuperar la sesión
        if (loadingAuth) {
            return;
        }

        const cargarCursos = async () => {
            try {
                setLoading(true);
                setError("");

                // Obtener todos los cursos
                const cursosDisponibles =
                    await obtenerCursos();

                // Si NO hay sesión, mostrar todos
                if (!isAuthenticated || !user?.id) {
                    setCursos(cursosDisponibles);
                    return;
                }

                // Obtener matrículas del usuario
                const matriculas =
                    await obtenerMatriculasPorUsuario(user.id);

                // IDs de cursos matriculados
                const cursosMatriculados =
                    matriculas.map(
                        (matricula) =>
                            Number(matricula.cursoId)
                    );

                // Mostrar solamente cursos
                // que NO están matriculados
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
                    "No se pudieron cargar los cursos."
                );
            } finally {
                setLoading(false);
            }
        };

        cargarCursos();

    }, [
        loadingAuth,
        isAuthenticated,
        user
    ]);

    return (
        <main className="home-page">
            <div className="home-container">

                <section className="home-header">
                    <span className="home-label">
                        FORMACIÓN ONLINE
                    </span>

                    <h1>
                        Aprende algo nuevo.
                    </h1>

                    <p>
                        Explora nuestros cursos y desarrolla
                        nuevas habilidades a tu ritmo.
                    </p>
                </section>

                <section className="home-courses">

                    <div className="home-section-header">
                        <div>
                            <span className="home-section-label">
                                CURSOS DISPONIBLES
                            </span>

                            <h2>
                                {isAuthenticated
                                    ? "Continúa aprendiendo"
                                    : "Encuentra tu próximo curso"}
                            </h2>
                        </div>

                        {!loading && (
                            <span className="home-course-count">
                                {cursos.length}{" "}
                                {cursos.length === 1
                                    ? "curso"
                                    : "cursos"}
                            </span>
                        )}
                    </div>

                    {loading && (
                        <p className="home-message">
                            Cargando cursos...
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
                                    No hay cursos disponibles
                                </h3>

                                <p>
                                    Ya estás matriculado en
                                    todos los cursos disponibles.
                                </p>
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        cursos.length > 0 && (
                            <div className="home-course-grid">

                                {cursos.map((curso) => (
                                    <CourseCard
                                        key={curso.id}
                                        curso={curso}
                                    />
                                ))}

                            </div>
                        )}

                </section>

            </div>
        </main>
    );
}

export default Home;