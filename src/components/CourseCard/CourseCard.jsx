import "./CourseCard.css";

function CourseCard({ curso, onVerInfo }) {

    const handleVerInformacion = () => {
        onVerInfo(curso);
    };

    return (
        <article className="course-card">

            <div className="course-card-top">
                <span className="course-category">
                    {curso.categoria}
                </span>
            </div>

            <div className="course-card-content">

                <h3>
                    {curso.nombre}
                </h3>

                <p>
                    {curso.descripcion}
                </p>

                <div className="course-details">

                    <div>
                        <span>Profesor</span>
                        <strong>
                            {curso.profesor}
                        </strong>
                    </div>

                    <div>
                        <span>Duración</span>
                        <strong>
                            {curso.duracion}
                        </strong>
                    </div>

                </div>

                <div className="course-card-footer">

                    <div className="course-price">

                        <span>Inversión</span>

                        <strong>
                            ₡{curso.precio.toLocaleString("es-CR")}
                        </strong>

                    </div>

                    <button
                        type="button"
                        onClick={handleVerInformacion}
                    >
                        Ver información
                    </button>

                </div>

            </div>

        </article>
    );
}

export default CourseCard;