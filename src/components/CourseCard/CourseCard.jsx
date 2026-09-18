import "./CourseCard.css";

function CourseCard({
    curso,
    promocion,
    onVerInfo
}) {
    const handleVerInformacion = () => {
        onVerInfo(curso);
    };

    const calcularPrecioFinal = () => {
        if (!promocion) {
            return Number(curso.precio);
        }

        if (promocion.tipo === "porcentaje") {
            return Math.max(
                0,
                Number(curso.precio) -
                    (
                        Number(curso.precio) *
                        Number(promocion.valor)
                    ) /
                    100
            );
        }

        if (promocion.tipo === "monto") {
            return Math.max(
                0,
                Number(curso.precio) -
                    Number(promocion.valor)
            );
        }

        return Number(curso.precio);
    };

    const precioOriginal =
        Number(curso.precio);

    const precioFinal =
        calcularPrecioFinal();

    const formatearPrecio = (precio) => {
        return `₡${Number(precio).toLocaleString(
            "es-CR"
        )}`;
    };

    const obtenerTextoPromocion = () => {
        if (!promocion) {
            return "";
        }

        if (promocion.tipo === "porcentaje") {
            return `${promocion.valor}% de descuento`;
        }

        return `${formatearPrecio(
            promocion.valor
        )} de descuento`;
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
                        <span>
                            Profesor
                        </span>

                        <strong>
                            {curso.profesor}
                        </strong>
                    </div>

                    <div>
                        <span>
                            Duración
                        </span>

                        <strong>
                            {curso.duracion}
                        </strong>
                    </div>

                </div>

                <div className="course-card-footer">

                    <div className="course-price">

                        {promocion ? (
                            <>
                                <span className="course-promotion-label">
                                    {obtenerTextoPromocion()}
                                </span>

                                <div className="course-price-promotion">

                                    <span className="course-original-price">
                                        {formatearPrecio(
                                            precioOriginal
                                        )}
                                    </span>

                                    <strong>
                                        {formatearPrecio(
                                            precioFinal
                                        )}
                                    </strong>

                                </div>
                            </>
                        ) : (
                            <>
                                <span>
                                    Inversión
                                </span>

                                <strong>
                                    {formatearPrecio(
                                        precioOriginal
                                    )}
                                </strong>
                            </>
                        )}

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