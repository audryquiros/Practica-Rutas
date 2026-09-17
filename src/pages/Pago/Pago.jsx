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

        const cargarCurso =
            async () => {

                try {

                    setLoading(true);
                    setError("");

                    const cursoObtenido =
                        await obtenerCursoPorId(
                            cursoId
                        );

                    setCurso(
                        cursoObtenido
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

        cargarCurso();

    }, [cursoId]);

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
                        []
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

                </div>

            </main>
        );
    }

    return (
        <main className="pago-page">

            <div className="pago-container">

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

                        <strong>
                            ₡
                            {curso.precio.toLocaleString(
                                "es-CR"
                            )}
                        </strong>

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

                    </form>

                </section>

            </div>

        </main>
    );
}

export default Pago;