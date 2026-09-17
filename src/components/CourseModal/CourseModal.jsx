import { useEffect } from "react";
import "./CourseModal.css";

function CourseModal({ curso, onClose }) {

    useEffect(() => {

        if (!curso) {
            return;
        }

        const handleEscape = (event) => {

            if (event.key === "Escape") {
                onClose();
            }

        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };

    }, [curso, onClose]);

    if (!curso) {
        return null;
    }

    const handleOverlayClick = (event) => {

        if (event.target === event.currentTarget) {
            onClose();
        }

    };

    return (
        <div
            className="modal-overlay"
            onClick={handleOverlayClick}
        >

            <div className="course-modal">

                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    ×
                </button>

                <div className="modal-header">

                    <span className="modal-category">
                        {curso.categoria}
                    </span>

                    <h2>
                        {curso.nombre}
                    </h2>

                    <p>
                        {curso.descripcion}
                    </p>

                </div>

                <div className="modal-info">

                    <div className="modal-info-item">

                        <span>
                            Profesor
                        </span>

                        <strong>
                            {curso.profesor}
                        </strong>

                    </div>

                    <div className="modal-info-item">

                        <span>
                            Duración
                        </span>

                        <strong>
                            {curso.duracion}
                        </strong>

                    </div>

                    <div className="modal-info-item">

                        <span>
                            Modalidad
                        </span>

                        <strong>
                            {curso.modalidad}
                        </strong>

                    </div>

                </div>

                <div className="modal-footer">

                    <div className="modal-price">

                        <span>
                            Inversión
                        </span>

                        <strong>
                            ₡{curso.precio.toLocaleString("es-CR")}
                        </strong>

                    </div>

                    <button
                        type="button"
                        className="modal-enroll"
                    >
                        Matricular curso
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CourseModal;