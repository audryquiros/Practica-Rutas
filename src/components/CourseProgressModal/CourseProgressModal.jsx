import "./CourseProgressModal.css";

function CourseProgressModal({ curso, onClose }) {
    if (!curso) {
        return null;
    }

    return (
        <div
            className="progress-modal-overlay"
            onClick={onClose}
        >
            <section
                className="progress-modal"
                onClick={(event) => event.stopPropagation()}
            >

                <button
                    className="progress-modal-close"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    ×
                </button>

                <div className="progress-modal-header">

                    <span className="progress-modal-category">
                        {curso.categoria}
                    </span>

                    <h2>{curso.nombre}</h2>

                    <p>
                        {curso.profesor}
                    </p>

                </div>

                <div className="progress-modal-progress">

                    <div className="progress-modal-progress-header">
                        <span>Progreso del curso</span>

                        <strong>
                            {curso.progreso}%
                        </strong>
                    </div>

                    <div className="progress-modal-progress-bar">
                        <div
                            className="progress-modal-progress-fill"
                            style={{
                                width: `${curso.progreso}%`
                            }}
                        ></div>
                    </div>

                </div>

                <div className="progress-modal-section">

                    <div className="progress-section-heading">
                        <h3>Temas</h3>

                        <span>
                            {curso.temasVistos?.length || 0}/
                            {curso.temas?.length || 0}
                        </span>
                    </div>

                    <div className="progress-topic-list">

                        {curso.temas?.map((tema) => {

                            const visto =
                                curso.temasVistos?.includes(tema.id);

                            return (
                                <div
                                    className={
                                        visto
                                            ? "progress-topic completed"
                                            : "progress-topic"
                                    }
                                    key={tema.id}
                                >
                                    <span className="topic-indicator">
                                        {visto ? "✓" : ""}
                                    </span>

                                    <span>
                                        {tema.nombre}
                                    </span>
                                </div>
                            );
                        })}

                    </div>

                </div>

                <div className="progress-modal-section">

                    <div className="progress-section-heading">
                        <h3>Tareas</h3>

                        <span>
                            {curso.tareasCompletadas?.length || 0}/
                            {curso.tareas?.length || 0}
                        </span>
                    </div>

                    <div className="progress-task-list">

                        {curso.tareas?.map((tarea) => {

                            const completada =
                                curso.tareasCompletadas?.includes(
                                    tarea.id
                                );

                            return (
                                <div
                                    className={
                                        completada
                                            ? "progress-task completed"
                                            : "progress-task"
                                    }
                                    key={tarea.id}
                                >
                                    <div>
                                        <strong>
                                            {tarea.nombre}
                                        </strong>

                                        <span>
                                            {tarea.descripcion}
                                        </span>
                                    </div>

                                    <span className="task-status">
                                        {completada
                                            ? "Completada"
                                            : "Pendiente"}
                                    </span>
                                </div>
                            );
                        })}

                    </div>

                </div>

                <div className="progress-modal-details">

                    <div>
                        <span>Duración</span>
                        <strong>{curso.duracion}</strong>
                    </div>

                    <div>
                        <span>Modalidad</span>
                        <strong>{curso.modalidad}</strong>
                    </div>

                    <div>
                        <span>Estado</span>
                        <strong>{curso.estado}</strong>
                    </div>

                </div>

            </section>
        </div>
    );
}

export default CourseProgressModal;