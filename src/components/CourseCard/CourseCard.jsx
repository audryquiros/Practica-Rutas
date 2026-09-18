import { useLanguage } from "../../context/LanguageContext";
import { useCurrency } from "../../context/CurrencyContext";
import { calcularPrecioPromocional } from "../../services/promocionesService";
import "./CourseCard.css";

function CourseCard({
    curso,
    promocion,
    onVerInfo
}) {
    const { idioma, t } = useLanguage();
    const { formatearPrecio } = useCurrency();

    const idiomaIngles = idioma === "en";

    const precioOriginal = Number(curso.precio);
    const promocionActiva = Boolean(promocion);

    const precioFinal = promocionActiva
        ? calcularPrecioPromocional(precioOriginal, promocion)
        : precioOriginal;

    const descuento = promocionActiva
        ? Math.max(0, precioOriginal - precioFinal)
        : 0;

    const porcentajeDescuento =
        promocionActiva && precioOriginal > 0
            ? Math.round((descuento / precioOriginal) * 100)
            : 0;

    const nombreCurso =
        idiomaIngles && curso.nombre_en
            ? curso.nombre_en
            : curso.nombre;

    const descripcionCurso =
        idiomaIngles && curso.descripcion_en
            ? curso.descripcion_en
            : curso.descripcion;

    const categoriaCurso =
        idiomaIngles && curso.categoria_en
            ? curso.categoria_en
            : curso.categoria;

    const duracionCurso =
        idiomaIngles && curso.duracion_en
            ? curso.duracion_en
            : curso.duracion;

    const formatoPrecio = formatearPrecio;

    const obtenerTextoPromocion = () => {
        if (!promocionActiva) return "";

        if (promocion.tipo === "porcentaje") {
            return `${promocion.valor}% ${t("descuento")}`;
        }

        return `${formatoPrecio(promocion.valor)} ${t("deDescuento")}`;
    };

    const handleVerInformacion = () => {
        onVerInfo(curso);
    };

    return (
        <article
            className="course-card"
        >
            <div className="course-card-top"></div>

            <div className="course-card-content">
                <span className="course-category">
                    {categoriaCurso}
                </span>

                <h3>{nombreCurso}</h3>

                <p>{descripcionCurso}</p>

                <div className="course-details">
                    <div>
                        <span>{t("profesor")}</span>
                        <strong>{curso.profesor}</strong>
                    </div>

                    <div>
                        <span>{t("duracion")}</span>
                        <strong>{duracionCurso}</strong>
                    </div>
                </div>

                <div className="course-card-footer">
                    <div className="course-price">
                        <span>{t("inversion")}</span>

                        {promocionActiva ? (
                            <>
                                <span className="course-promotion-label">
                                    {obtenerTextoPromocion()}
                                </span>

                                <div className="course-price-promotion">
                                    <span className="course-original-price">
                                        {formatoPrecio(precioOriginal)}
                                    </span>

                                    <strong>
                                        {formatoPrecio(precioFinal)}
                                    </strong>
                                </div>

                                <span className="course-savings">
                                    {t("ahorras")}{" "}
                                    {formatoPrecio(descuento)}{" "}
                                    ({porcentajeDescuento}%)
                                </span>
                            </>
                        ) : (
                            <strong>
                                {formatoPrecio(precioOriginal)}
                            </strong>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleVerInformacion}
                    >
                        {t("verInformacion")}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default CourseCard;
