import { useEffect, useState } from "react";
import { obtenerCursos } from "../../services/cursosService";
import CourseCard from "../../components/CourseCard/CourseCard";
import CourseModal from "../../components/CourseModal/CourseModal";
import "./Home.css";

function Home() {

    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    useEffect(() => {

        const cargarCursos = async () => {

            try {

                const data = await obtenerCursos();

                setCursos(data);

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

    }, []);

    const abrirModal = (curso) => {
        setCursoSeleccionado(curso);
    };

    const cerrarModal = () => {
        setCursoSeleccionado(null);
    };

    return (
        <main className="home">

            <section className="home-hero">

                <div className="hero-content">

                    <span className="hero-label">
                        PLATAFORMA DE APRENDIZAJE
                    </span>

                    <h1>
                        Aprende hoy,
                        <span> transforma tu futuro.</span>
                    </h1>

                    <p>
                        Explora cursos diseñados para ayudarte
                        a desarrollar nuevas habilidades y
                        avanzar profesionalmente.
                    </p>

                </div>

            </section>

            <section className="courses-section">

                <div className="section-heading">

                    <div>

                        <span className="section-label">
                            NUESTRA OFERTA
                        </span>

                        <h2>
                            Cursos disponibles
                        </h2>

                    </div>

                    <p>
                        Encuentra el curso que mejor se adapte
                        a tus objetivos.
                    </p>

                </div>

                {loading && (
                    <p className="status-message">
                        Cargando cursos...
                    </p>
                )}

                {error && (
                    <p className="status-message error">
                        {error}
                    </p>
                )}

                {!loading && !error && (

                    <div className="courses-grid">

                        {cursos.map((curso) => (

                            <CourseCard
                                key={curso.id}
                                curso={curso}
                                onVerInfo={abrirModal}
                            />

                        ))}

                    </div>

                )}

            </section>

            <CourseModal
                curso={cursoSeleccionado}
                onClose={cerrarModal}
            />

        </main>
    );
}

export default Home;