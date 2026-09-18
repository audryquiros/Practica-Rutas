import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import {
    obtenerCursoPorId
} from "../../services/cursosService";

import {
    crearMatricula,
    obtenerMatriculasPorUsuario
} from "../../services/matriculasService";

import {
    obtenerPromocionesActivas,
    calcularPrecioPromocional
} from "../../services/promocionesService";

import "./Pago.css";

function Pago() {
    const { cursoId } =
        useParams();

    const { user } =
        useAuth();

    const { t } =
        useTheme();

    const navigate =
        useNavigate();

    const [curso, setCurso] =
        useState(null);

    const [promocion, setPromocion] =
        useState(null);

    const [numeroTarjeta, setNumeroTarjeta] =
        useState("");

    const [vencimiento, setVencimiento] =
        useState("");

    const [cvv, setCvv] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [procesando, setProcesando] =
        useState(false);

    useEffect(() => {
        const cargarDatos =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const [
                        cursoObtenido,
                        promocionesActivas
                    ] = await Promise.all([
                        obtenerCursoPorId(
                            cursoId
                        ),
                        obtenerPromocionesActivas()
                    ]);

                    setCurso(
                        cursoObtenido
                    );

                    const promocionCurso =
                        promocionesActivas.find(
                            (item) =>
                                String(
                                    item.cursoId
                                ) ===
                                String(
                                    cursoId
                                )
                        );

                    setPromocion(
                        promocionCurso ||
                        null
                    );

                } catch (error) {
                    console.error(error);

                    setError(
                        "No se pudo cargar el curso."
                    );

                } finally {
                    setLoading(false);
                }
            };

        cargarDatos();

    }, [cursoId]);

    const manejarCancelar = () => {
        navigate("/");
    };

    const obtenerTextoPromocion = () => {
        if (!promocion) {
            return "";
        }

        if (
            promocion.tipo ===
            "porcentaje"
        ) {
            return `${promocion.valor}% de descuento`;
        }

        return `₡${Number(
            promocion.valor
        ).toLocaleString(
            "es-CR"
        )} de descuento`;
    };

    const precioOriginal =
        Number(
            curso?.precio || 0
        );

    const precioFinal =
        promocion
            ? calcularPrecioPromocional(
                precioOriginal,
                promocion
            )
            : precioOriginal;

    const manejarPago =
        async (event) => {
            event.preventDefault();

            setError("");

            if (
                !numeroTarjeta.trim() ||
                !vencimiento.trim() ||
                !cvv.trim()
            ) {
                setError(
                    t(
                        "completarDatosPago"
                    )
                );

                return;
            }

            if (!user?.id) {
                setError(
                    t(
                        "necesitasSesion"
                    )
                );

                return;
            }

            try {
                setProcesando(true);

                const matriculas =
                    await obtenerMatriculasPorUsuario(
                        user.id
                    );

                const yaMatriculado =
                    matriculas.some(
                        (matricula) =>
                            Number(
                                matricula.cursoId
                            ) ===
                            Number(cursoId)
                    );

                if (yaMatriculado) {
                    setError(
                        t(
                            "yaMatriculado"
                        )
                    );

                    setProcesando(false);

                    return;
                }

                await crearMatricula({
                    usuarioId:
                        Number(user.id),

                    cursoId:
                        Number(cursoId),

                    estado:
                        "Activo",

                    progreso:
                        0,

                    temasVistos:
                        [],

                    tareasCompletadas:
                        [],

                    precioOriginal:
                        precioOriginal,

                    precioPagado:
                        precioFinal,

                    promocionId:
                        promocion?.id ||
                        null
                });

                navigate(
                    "/dashboard"
                );

            } catch (error) {
                console.error(error);

                setError(
                    t(
                        "noSePudoCompletar"
                    )
                );

            } finally {
                setProcesando(false);
            }
        };

    if (loading) {
        return (
            <main className="pago-page">

                <div className="pago-container">

                    <p className="pago-message">
                        {t("cargar")}
                    </p>

                </div>

            </main>
        );
    }

    if (!curso) {
        return (
            <main className="pago-page">

                <div className="pago-container">

                    <p className="pago-message pago-error">
                        {error ||
                            "Curso no encontrado."}
                    </p>

                    <button
                        type="button"
                        className="pago-cancelar"
                        onClick={
                            manejarCancelar
                        }
                    >
                        Volver
                    </button>

                </div>

            </main>
        );
    }

    return (
        <main className="pago-page">

            <div className="pago-container">

                <button
                    type="button"
                    className="pago-back"
                    onClick={
                        manejarCancelar
                    }
                >
                    ← Volver
                </button>

                <div className="pago-header">

                    <span className="pago-label">
                        {t("matricula")}
                    </span>

                    <h1>
                        {t(
                            "completarMatricula"
                        )}
                    </h1>

                    <p>
                        {t(
                            "revisaInformacion"
                        )}
                    </p>

                </div>

                <section className="pago-card">

                    <div className="pago-course">

                        <span>
                            {t(
                                "cursoSeleccionado"
                            )}
                        </span>

                        <h2>
                            {curso.nombre}
                        </h2>

                        <p>
                            {curso.descripcion}
                        </p>

                        {promocion ? (
                            <div className="pago-precio-promocion">

                                <span className="pago-promocion">
                                    {obtenerTextoPromocion()}
                                </span>

                                <span className="pago-precio-original">
                                    ₡
                                    {precioOriginal.toLocaleString(
                                        "es-CR"
                                    )}
                                </span>

                                <strong>
                                    ₡
                                    {Number(
                                        precioFinal
                                    ).toLocaleString(
                                        "es-CR"
                                    )}
                                </strong>

                            </div>
                        ) : (
                            <strong>
                                ₡
                                {precioOriginal.toLocaleString(
                                    "es-CR"
                                )}
                            </strong>
                        )}

                    </div>

                    <div className="pago-divider"></div>

                    <form
                        className="pago-form"
                        onSubmit={
                            manejarPago
                        }
                    >

                        <div className="form-group">

                            <label htmlFor="card">
                                {t(
                                    "numeroTarjeta"
                                )}
                            </label>

                            <input
                                id="card"
                                type="text"
                                value={
                                    numeroTarjeta
                                }
                                onChange={(
                                    event
                                ) =>
                                    setNumeroTarjeta(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="0000 0000 0000 0000"
                            />

                        </div>

                        <div className="pago-row">

                            <div className="form-group">

                                <label htmlFor="expiry">
                                    {t(
                                        "vencimiento"
                                    )}
                                </label>

                                <input
                                    id="expiry"
                                    type="text"
                                    value={
                                        vencimiento
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setVencimiento(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="MM/AA"
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="cvv">
                                    {t("cvv")}
                                </label>

                                <input
                                    id="cvv"
                                    type="text"
                                    value={cvv}
                                    onChange={(
                                        event
                                    ) =>
                                        setCvv(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="000"
                                />

                            </div>

                        </div>

                        {error && (
                            <p className="pago-form-error">
                                {error}
                            </p>
                        )}

                        <div className="pago-actions">

                            <button
                                type="button"
                                className="pago-cancelar"
                                onClick={
                                    manejarCancelar
                                }
                                disabled={
                                    procesando
                                }
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="pago-button"
                                disabled={
                                    procesando
                                }
                            >
                                {procesando
                                    ? t(
                                        "procesandoMatricula"
                                    )
                                    : t(
                                        "confirmarMatricula"
                                    )}
                            </button>

                        </div>

                    </form>

                </section>

            </div>

        </main>
    );
}

export default Pago;