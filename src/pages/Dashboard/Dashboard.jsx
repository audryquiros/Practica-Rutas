import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { obtenerMatriculasPorUsuario } from "../../services/matriculasService";
import { obtenerCursoPorId } from "../../services/cursosService";
import CourseProgressModal from "../../components/CourseProgressModal/CourseProgressModal";
import "./Dashboard.css";

function Dashboard() {
    const { user } = useAuth();

    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarCursosUsuario = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const matriculas =
                    await obtenerMatriculasPorUsuario(user.id);

                const cursosUsuario = await Promise.all(
                    matriculas.map(async (matricula) => {
                        const curso = await obtenerCursoPorId(
                            matricula.cursoId
                        );

                        return {
                            ...curso,

                            // Información de la matrícula
                            progreso: matricula.progreso,
                            estado: matricula.estado,

                            // Progreso detallado
                            temasVistos:
                                matricula.temasVistos || [],

                            tareasCompletadas:
                                matricula.tareasCompletadas || []
                        };
                    })
                );

                setCursos(cursosUsuario);
            } catch (error) {
                console.error(error);
                setError(
                    "No se pudieron cargar tus cursos."
                );
            } finally {
                setLoading(false);
            }
        };

        cargarCursosUsuario();
    }, [user]);

    const cursosCompletados = cursos.filter(
        (curso) => curso.progreso === 100
    ).length;

    const progresoGeneral =
        cursos.length > 0
            ? Math.round(
                cursos.reduce(
                    (total, curso) =>
                        total + curso.progreso,
                    0
                ) / cursos.length
            )
            : 0;

    return (
        <main className="dashboard-page">
            <div className="dashboard-container">

                {/* ENCABEZADO */}
                <section className="dashboard-header">
                    <div>
                        <span className="dashboard-label">
                            MI ESPACIO
                        </span>

                        <h1>
                            Bienvenido,{" "}
                            {user?.nombre || "Usuario"}
                        </h1>

                        <p>
                            Consulta tu progreso y continúa
                            con tus cursos.
                        </p>
                    </div>
                </section>

                {/* ESTADÍSTICAS */}
                <section className="dashboard-stats">

                    <article className="dashboard-stat">
                        <span>
                            Cursos matriculados
                        </span>

                        <strong>
                            {cursos.length}
                        </strong>
                    </article>

                    <article className="dashboard-stat">
                        <span>
                            Cursos completados
                        </span>

                        <strong>
                            {cursosCompletados}
                        </strong>
                    </article>

                    <article className="dashboard-stat">
                        <span>
                            Progreso general
                        </span>

                        <strong>
                            {progresoGeneral}%
                        </strong>
                    </article>

                </section>

                {/* CURSOS */}
                <section className="dashboard-courses">

                    <div className="dashboard-section-header">
                        <h2>Mis cursos</h2>

                        <p>
                            Estos son los cursos en los que
                            estás matriculado actualmente.
                        </p>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <p className="dashboard-message">
                            Cargando tus cursos...
                        </p>
                    )}

                    {/* ERROR */}
                    {error && (
                        <p className="dashboard-message dashboard-error">
                            {error}
                        </p>
                    )}

                    {/* SIN CURSOS */}
                    {!loading &&
                        !error &&
                        cursos.length === 0 && (
                            <div className="empty-courses">

                                <h3>
                                    Aún no tienes cursos
                                </h3>

                                <p>
                                    Explora nuestra oferta
                                    académica y encuentra
                                    un curso para comenzar.
                                </p>

                            </div>
                        )}

                    {/* CURSOS */}
                    {!loading &&
                        !error &&
                        cursos.length > 0 && (

                            <div className="dashboard-course-grid">

                                {cursos.map((curso) => (

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

                                        {/* PROGRESO */}
                                        <div className="course-progress-header">

                                            <span>
                                                Progreso
                                            </span>

                                            <strong>
                                                {curso.progreso}%
                                            </strong>

                                        </div>

                                        <div className="course-progress">

                                            <div
                                                className="course-progress-bar"
                                                style={{
                                                    width: `${curso.progreso}%`
                                                }}
                                            ></div>

                                        </div>

                                        <span className="course-status">
                                            {curso.estado}
                                        </span>

                                        {/* BOTÓN */}
                                        <button
                                            className="dashboard-course-button"
                                            onClick={() =>
                                                setCursoSeleccionado(
                                                    curso
                                                )
                                            }
                                        >
                                            Ver curso
                                        </button>

                                    </article>

                                ))}

                            </div>
                        )}

                </section>

            </div>

            {/* MODAL */}
            <CourseProgressModal
                curso={cursoSeleccionado}
                onClose={() =>
                    setCursoSeleccionado(null)
                }
            />

        </main>
    );
}

export default Dashboard;