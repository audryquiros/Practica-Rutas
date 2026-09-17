import { Link } from "react-router-dom";
import "./Ayuda.css";

function Ayuda() {
    return (
        <main className="ayuda-page">
            <div className="ayuda-container">

                <section className="ayuda-header">
                    <span className="ayuda-label">
                        CENTRO DE AYUDA
                    </span>

                    <h1>
                        ¿Cómo podemos ayudarte?
                    </h1>

                    <p>
                        Encuentra información sobre la plataforma,
                        tus cursos y el proceso de matrícula.
                    </p>
                </section>

                <section className="ayuda-grid">

                    <article className="ayuda-card">
                        <span className="ayuda-number">
                            01
                        </span>

                        <h2>
                            ¿Cómo matricularme?
                        </h2>

                        <p>
                            Explora los cursos disponibles desde
                            Inicio, selecciona el curso que te
                            interesa y presiona "Matricular curso".
                        </p>
                    </article>

                    <article className="ayuda-card">
                        <span className="ayuda-number">
                            02
                        </span>

                        <h2>
                            ¿Dónde veo mis cursos?
                        </h2>

                        <p>
                            Después de iniciar sesión y completar
                            una matrícula, podrás consultar tus
                            cursos desde la sección "Mis cursos".
                        </p>
                    </article>

                    <article className="ayuda-card">
                        <span className="ayuda-number">
                            03
                        </span>

                        <h2>
                            ¿Cómo consulto mi progreso?
                        </h2>

                        <p>
                            Desde Mis cursos puedes seleccionar
                            cualquier curso matriculado y consultar
                            tus temas, tareas y porcentaje de progreso.
                        </p>
                    </article>

                    <article className="ayuda-card">
                        <span className="ayuda-number">
                            04
                        </span>

                        <h2>
                            ¿Necesito una cuenta?
                        </h2>

                        <p>
                            Sí. Para matricular un curso debes iniciar
                            sesión. Si todavía no tienes una cuenta,
                            puedes registrarte gratuitamente.
                        </p>
                    </article>

                </section>

                <section className="ayuda-contact">

                    <div>
                        <span className="ayuda-contact-label">
                            ¿TODAVÍA TIENES DUDAS?
                        </span>

                        <h2>
                            Comienza explorando nuestros cursos.
                        </h2>
                    </div>

                    <Link
                        to="/"
                        className="ayuda-button"
                    >
                        Ver cursos
                    </Link>

                </section>

            </div>
        </main>
    );
}

export default Ayuda;