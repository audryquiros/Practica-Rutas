import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useCurrency } from "../../context/CurrencyContext";
import { calcularPrecioPromocional } from "../../services/promocionesService";
import { useNavigate } from "react-router-dom";
import "./CourseModal.css";

function CourseModal({ curso, promocion, onClose }) {
    const { isAuthenticated } = useAuth();
    const { idioma, t } = useLanguage();
    const { formatearPrecio } = useCurrency();
    const navigate = useNavigate();

    const idiomaIngles = idioma === "en";

    const nombreCurso =
        idiomaIngles && curso?.nombre_en
            ? curso.nombre_en
            : curso?.nombre;

    const descripcionCurso =
        idiomaIngles && curso?.descripcion_en
            ? curso.descripcion_en
            : curso?.descripcion;

    const categoriaCurso =
        idiomaIngles && curso?.categoria_en
            ? curso.categoria_en
            : curso?.categoria;

    const duracionCurso =
        idiomaIngles && curso?.duracion_en
            ? curso.duracion_en
            : curso?.duracion;

    const modalidadCurso =
        idiomaIngles && curso?.modalidad_en
            ? curso.modalidad_en
            : curso?.modalidad;

    const precioOriginal = Number(curso?.precio || 0);
    const promocionActiva = Boolean(promocion);
    const precioFinal = promocionActiva
        ? calcularPrecioPromocional(precioOriginal, promocion)
        : precioOriginal;
    const descuento = Math.max(0, precioOriginal - precioFinal);
    const porcentajeDescuento = precioOriginal > 0
        ? Math.round((descuento / precioOriginal) * 100)
        : 0;

    useEffect(() => {
        if (!curso) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [curso, onClose]);

    if (!curso) return null;

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleMatricula = () => {
        onClose();

        if (!isAuthenticated) {
            navigate("/login", {
                state: {
                    cursoId: curso.id
                }
            });

            return;
        }

        navigate(`/pago/${curso.id}`);
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
                    aria-label={idiomaIngles ? "Close" : "Cerrar"}
                >
                    ×
                </button>

                <div className="modal-header">

                    <span className="modal-category">
                        {categoriaCurso}
                    </span>

                    <h2>
                        {nombreCurso}
                    </h2>

                    <p>
                        {descripcionCurso}
                    </p>

                </div>

                <div className="modal-info">

                    <div className="modal-info-item">
                        <span>
                            {t("profesor")}
                        </span>

                        <strong>
                            {curso.profesor}
                        </strong>
                    </div>

                    <div className="modal-info-item">
                        <span>
                            {t("duracion")}
                        </span>

                        <strong>
                            {duracionCurso}
                        </strong>
                    </div>

                    <div className="modal-info-item">
                        <span>
                            {t("modalidad")}
                        </span>

                        <strong>
                            {modalidadCurso}
                        </strong>
                    </div>

                </div>

                <div className="modal-footer">

                    <div className="modal-price">

                        <span>
                            {t("inversion")}
                        </span>

                        {promocionActiva ? (
                            <>
                                <span className="modal-promotion-label">
                                    {promocion.tipo === "porcentaje"
                                        ? `${promocion.valor}% ${t("descuento")}`
                                        : `${formatearPrecio(promocion.valor)} ${t("deDescuento")}`}
                                </span>

                                <div className="modal-price-promotion">
                                    <span className="modal-original-price">
                                        {formatearPrecio(precioOriginal)}
                                    </span>
                                    <strong>
                                        {formatearPrecio(precioFinal)}
                                    </strong>
                                </div>

                                <small className="modal-savings">
                                    {t("ahorras")} {formatearPrecio(descuento)} ({porcentajeDescuento}%)
                                </small>
                            </>
                        ) : (
                            <strong>
                                {formatearPrecio(precioOriginal)}
                            </strong>
                        )}

                    </div>

                    <button
                        type="button"
                        className="modal-enroll"
                        onClick={handleMatricula}
                    >
                        {t("matricularCurso")}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default CourseModal;
