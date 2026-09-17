import "./Ayuda.css";

function Ayuda() {
    return (
        <main className="ayuda">
            <section className="ayuda-container">

                <div className="ayuda-header">
                    <span className="ayuda-label">
                        CENTRO DE AYUDA
                    </span>

                    <h1>
                        ¿Cómo podemos ayudarte?
                    </h1>

                    <p>
                        Encuentra respuestas a las preguntas más
                        frecuentes sobre nuestra plataforma.
                    </p>
                </div>

                <div className="ayuda-content">

                    <article className="ayuda-card">
                        <h2>¿Cómo puedo matricularme en un curso?</h2>

                        <p>
                            Explora los cursos disponibles y selecciona
                            el curso que deseas realizar. Para matricularte
                            necesitarás iniciar sesión en tu cuenta.
                        </p>
                    </article>

                    <article className="ayuda-card">
                        <h2>¿Los cursos son virtuales?</h2>

                        <p>
                            Sí. Los cursos disponibles en la plataforma
                            se ofrecen bajo modalidad virtual.
                        </p>
                    </article>

                    <article className="ayuda-card">
                        <h2>¿Cómo puedo acceder a mis cursos?</h2>

                        <p>
                            Una vez realizada la matrícula, podrás
                            consultar tus cursos desde tu dashboard.
                        </p>
                    </article>

                </div>

            </section>
        </main>
    );
}

export default Ayuda;