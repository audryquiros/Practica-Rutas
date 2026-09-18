import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useCurrency } from "../../context/CurrencyContext";

import {
    obtenerCursoPorId
} from "../../services/cursosService";

import {
    obtenerMatriculasPorUsuario,
    crearMatricula
} from "../../services/matriculasService";

import {
    obtenerPromocionesActivas,
    calcularPrecioPromocional
} from "../../services/promocionesService";

import "./Pago.css";


function Pago() {

    const {
        user
    } = useAuth();

    const { idioma, t } = useLanguage();

    const { formatearPrecio } = useCurrency();

    const {
        cursoId
    } = useParams();

    const navigate =
        useNavigate();


    const [
        curso,
        setCurso
    ] = useState(null);

    const [
        promocion,
        setPromocion
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        procesando,
        setProcesando
    ] = useState(false);

    const [
        error,
        setError
    ] = useState("");

    const [
        numeroTarjeta,
        setNumeroTarjeta
    ] = useState("");

    const [
        vencimiento,
        setVencimiento
    ] = useState("");

    const [
        cvv,
        setCvv
    ] = useState("");


    const idiomaIngles =
        idioma === "en";


    /* =====================================================
       CARGAR CURSO Y PROMOCIÓN
    ===================================================== */

    useEffect(() => {

        const cargarDatos =
            async () => {

                try {

                    setLoading(true);
                    setError("");

                    const [
                        cursoObtenido,
                        promociones
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
                        promociones.find(
                            (item) =>
                                Number(
                                    item.cursoId
                                ) === Number(
                                    cursoId
                                )
                        ) || null;

                    setPromocion(
                        promocionCurso
                    );

                } catch (error) {

                    console.error(
                        "Error cargando pago:",
                        error
                    );

                    setError(
                        idiomaIngles
                            ? "The course information could not be loaded."
                            : "No se pudo cargar la información del curso."
                    );

                } finally {

                    setLoading(false);

                }
            };


        cargarDatos();

    }, [
        cursoId
    ]);


    /* =====================================================
       DATOS DEL CURSO
    ===================================================== */

    const nombreCurso =
        idiomaIngles &&
        curso?.nombre_en
            ? curso.nombre_en
            : curso?.nombre;

    const categoriaCurso =
        idiomaIngles &&
        curso?.categoria_en
            ? curso.categoria_en
            : curso?.categoria;

    const duracionCurso =
        idiomaIngles &&
        curso?.duracion_en
            ? curso.duracion_en
            : curso?.duracion;

    const modalidadCurso =
        idiomaIngles &&
        curso?.modalidad_en
            ? curso.modalidad_en
            : curso?.modalidad;


    /* =====================================================
       PRECIOS
    ===================================================== */

    const precioOriginal =
        useMemo(
            () =>
                Number(
                    curso?.precio || 0
                ),
            [curso]
        );

    const precioFinal =
        useMemo(
            () =>
                calcularPrecioPromocional(
                    precioOriginal,
                    promocion
                ),
            [
                precioOriginal,
                promocion
            ]
        );

    const descuento =
        Math.max(
            0,
            precioOriginal -
            precioFinal
        );

    const porcentajeDescuento =
        precioOriginal > 0
            ? Math.round(
                (
                    descuento /
                    precioOriginal
                ) * 100
            )
            : 0;


    const formatoPrecio = formatearPrecio;


    /* =====================================================
       FORMATEAR TARJETA
    ===================================================== */

    const manejarTarjeta =
        (event) => {

            const valor =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 16);

            const formateado =
                valor
                    .replace(
                        /(.{4})/g,
                        "$1 "
                    )
                    .trim();

            setNumeroTarjeta(
                formateado
            );
        };


    const manejarVencimiento =
        (event) => {

            const valor =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

            const formateado =
                valor.length > 2
                    ? `${valor.slice(
                        0,
                        2
                    )}/${valor.slice(2)}`
                    : valor;

            setVencimiento(
                formateado
            );
        };


    const manejarCvv =
        (event) => {

            const valor =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

            setCvv(valor);
        };


    /* =====================================================
       CANCELAR
    ===================================================== */

    const manejarCancelar =
        () => {

            if (procesando) {
                return;
            }

            navigate("/");

        };


    /* =====================================================
       MATRÍCULA
    ===================================================== */

    const manejarPago =
        async (event) => {

            event.preventDefault();

            if (!user?.id) {

                setError(
                    t(
                        "necesitasSesion"
                    )
                );

                return;
            }

            const tarjetaLimpia =
                numeroTarjeta.replace(
                    /\s/g,
                    ""
                );

            if (
                tarjetaLimpia.length < 16 ||
                vencimiento.length !== 5 ||
                cvv.length < 3
            ) {

                setError(
                    idiomaIngles
                        ? "Complete all payment fields."
                        : "Completa todos los datos de pago."
                );

                return;
            }


            try {

                setProcesando(true);
                setError("");


                const matriculas =
                    await obtenerMatriculasPorUsuario(
                        user.id
                    );

                const yaMatriculado =
                    matriculas.some(
                        (matricula) =>
                            Number(
                                matricula.cursoId
                            ) === Number(
                                cursoId
                            )
                    );

                if (yaMatriculado) {

                    setError(
                        idiomaIngles
                            ? "You are already enrolled in this course."
                            : "Ya estás matriculado en este curso."
                    );

                    setProcesando(false);

                    return;
                }


                await crearMatricula({

                    usuarioId:
                        Number(
                            user.id
                        ),

                    cursoId:
                        Number(
                            cursoId
                        ),

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
                    "/dashboard",
                    {
                        replace: true,
                        state: {
                            matriculaExitosa:
                                true
                        }
                    }
                );

            } catch (error) {

                console.error(
                    "Error completando matrícula:",
                    error
                );

                setError(
                    t(
                        "noSePudoCompletar"
                    )
                );

            } finally {

                setProcesando(false);

            }
        };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (
            <main
                className="pago-page"
            >

                <div className="pago-container">

                    <div className="pago-loading">

                        <div className="pago-spinner"></div>

                        <span>
                            {t(
                                "cargando"
                            )}
                        </span>

                    </div>

                </div>

            </main>
        );
    }


    if (!curso) {

        return (
            <main
                className="pago-page"
            >

                <div className="pago-container">

                    <div className="pago-error-page">

                        <h1>
                            {t(
                                "noSePudoCompletar"
                            )}
                        </h1>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={
                                manejarCancelar
                            }
                        >
                            {t(
                                "cancelar"
                            )}
                        </button>

                    </div>

                </div>

            </main>
        );
    }


    return (
        <main
            className="pago-page"
        >

            <div className="pago-container">

                {/* =========================================
                   VOLVER
                ========================================= */}

                <button
                    type="button"
                    className="pago-back-button"
                    onClick={
                        manejarCancelar
                    }
                    disabled={procesando}
                >
                    ← {t("cancelar")}
                </button>


                {/* =========================================
                   ENCABEZADO
                ========================================= */}

                <section className="pago-heading">

                    <span className="pago-eyebrow">
                        {t(
                            "cursoSeleccionado"
                        )}
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

                </section>


                {/* =========================================
                   CONTENIDO
                ========================================= */}

                <div className="pago-layout">

                    {/* =====================================
                       RESUMEN CURSO
                    ===================================== */}

                    <section className="pago-course-card">

                        <span className="pago-category">
                            {categoriaCurso}
                        </span>

                        <h2>
                            {nombreCurso}
                        </h2>

                        <div className="pago-course-details">

                            <div>
                                <span>
                                    {t(
                                        "profesor"
                                    )}
                                </span>

                                <strong>
                                    {
                                        curso.profesor
                                    }
                                </strong>
                            </div>

                            <div>
                                <span>
                                    {t(
                                        "duracion"
                                    )}
                                </span>

                                <strong>
                                    {
                                        duracionCurso
                                    }
                                </strong>
                            </div>

                            <div>
                                <span>
                                    {t(
                                        "modalidad"
                                    )}
                                </span>

                                <strong>
                                    {
                                        modalidadCurso
                                    }
                                </strong>
                            </div>

                        </div>


                        <div className="pago-price-box">

                            <span>
                                {t(
                                    "inversion"
                                )}
                            </span>


                            {promocion ? (

                                <>
                                    <div className="pago-promotion-title">
                                        {promocion.tipo ===
                                        "porcentaje"
                                            ? `${promocion.valor}% ${t(
                                                "descuento"
                                            )}`
                                            : `${formatoPrecio(
                                                promocion.valor
                                            )} ${t(
                                                "deDescuento"
                                            )}`}
                                    </div>

                                    <div className="pago-price-row">

                                        <span className="pago-original-price">
                                            {
                                                formatoPrecio(
                                                    precioOriginal
                                                )
                                            }
                                        </span>

                                        <strong>
                                            {
                                                formatoPrecio(
                                                    precioFinal
                                                )
                                            }
                                        </strong>

                                    </div>

                                    <small>
                                        {t(
                                            "ahorras"
                                        )}{" "}
                                        {
                                            formatoPrecio(
                                                descuento
                                            )
                                        }{" "}
                                        ({porcentajeDescuento}%)
                                    </small>

                                </>

                            ) : (

                                <strong>
                                    {
                                        formatoPrecio(
                                            precioOriginal
                                        )
                                    }
                                </strong>

                            )}

                        </div>

                    </section>


                    {/* =====================================
                       FORMULARIO PAGO
                    ===================================== */}

                    <section className="pago-form-card">

                        <div className="pago-form-header">

                            <span className="pago-form-number">
                                01
                            </span>

                            <div>
                                <h2>
                                    {t(
                                        "completarDatosPago"
                                    )}
                                </h2>

                                <p>
                                    {idiomaIngles
                                        ? "This is an academic payment simulation."
                                        : "Esta es una simulación académica de pago."}
                                </p>
                            </div>

                        </div>


                        <form
                            className="pago-form"
                            onSubmit={
                                manejarPago
                            }
                        >

                            <label>
                                <span>
                                    {t(
                                        "numeroTarjeta"
                                    )}
                                </span>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="cc-number"
                                    placeholder={
                                        "0000 0000 0000 0000"
                                    }
                                    value={
                                        numeroTarjeta
                                    }
                                    onChange={
                                        manejarTarjeta
                                    }
                                    disabled={
                                        procesando
                                    }
                                    required
                                />
                            </label>


                            <div className="pago-form-row">

                                <label>
                                    <span>
                                        {t(
                                            "vencimiento"
                                        )}
                                    </span>

                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="cc-exp"
                                        placeholder="MM/AA"
                                        value={
                                            vencimiento
                                        }
                                        onChange={
                                            manejarVencimiento
                                        }
                                        disabled={
                                            procesando
                                        }
                                        required
                                    />
                                </label>


                                <label>
                                    <span>
                                        {t(
                                            "cvv"
                                        )}
                                    </span>

                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        autoComplete="cc-csc"
                                        placeholder="000"
                                        value={
                                            cvv
                                        }
                                        onChange={
                                            manejarCvv
                                        }
                                        disabled={
                                            procesando
                                        }
                                        required
                                    />
                                </label>

                            </div>


                            {error && (
                                <div className="pago-error">
                                    {error}
                                </div>
                            )}


                            <div className="pago-total">

                                <span>
                                    {t(
                                        "matricula"
                                    )}
                                </span>

                                <strong>
                                    {
                                        formatoPrecio(
                                            precioFinal
                                        )
                                    }
                                </strong>

                            </div>


                            <div className="pago-actions">

                                <button
                                    type="button"
                                    className="pago-cancel-button"
                                    onClick={
                                        manejarCancelar
                                    }
                                    disabled={
                                        procesando
                                    }
                                >
                                    {t(
                                        "cancelar"
                                    )}
                                </button>

                                <button
                                    type="submit"
                                    className="pago-submit-button"
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

            </div>

        </main>
    );
}


export default Pago;