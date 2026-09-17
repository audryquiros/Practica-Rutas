import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
    obtenerCursoPorId
} from "../../services/cursosService";

import {
    crearMatricula
} from "../../services/matriculasService";

import "./Pago.css";

function Pago() {
    const { cursoId } = useParams();

    const { user } = useAuth();

    const navigate = useNavigate();

    const [curso, setCurso] = useState(null);

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

        const cargarCurso = async () => {

            try {

                setLoading(true);
                setError("");

                const cursoObtenido =
                    await obtenerCursoPorId(cursoId);

                setCurso(cursoObtenido);

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


    const manejarPago = async (event) => {

        event.preventDefault();

        setError("");

        if (
            !numeroTarjeta.trim() ||
            !vencimiento.trim() ||
            !cvv.trim()
        ) {
            setError(
                "Completa todos los datos de pago."
            );

            return;
        }

        if (!user?.id) {
            setError(
                "Necesitas iniciar sesión para matricularte."
            );

            return;
        }

        try {

            setProcesando(true);

            await crearMatricula({

                usuarioId: user.id,

                cursoId: Number(cursoId),

                estado: "Activo",

                progreso: 0,

                temasVistos: [],

                tareasCompletadas: []

            });

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            setError(
                "No se pudo completar la matrícula."
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
                        Cargando información del curso...
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
                        {error || "Curso no encontrado."}
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
                        MATRÍCULA
                    </span>

                    <h1>
                        Completar matrícula
                    </h1>

                    <p>
                        Revisa la información y completa
                        el proceso de inscripción.
                    </p>

                </div>


                <section className="pago-card">

                    <div className="pago-course">

                        <span>
                            CURSO SELECCIONADO
                        </span>

                        <h2>
                            {curso.nombre}
                        </h2>

                        <p>
                            {curso.descripcion}
                        </p>

                        <strong>
                            ₡{curso.precio.toLocaleString("es-CR")}
                        </strong>

                    </div>


                    <div className="pago-divider"></div>


                    <form
                        className="pago-form"
                        onSubmit={manejarPago}
                    >

                        <div className="form-group">

                            <label htmlFor="card">
                                Número de tarjeta
                            </label>

                            <input
                                id="card"
                                type="text"
                                value={numeroTarjeta}
                                onChange={(event) =>
                                    setNumeroTarjeta(
                                        event.target.value
                                    )
                                }
                                placeholder="0000 0000 0000 0000"
                            />

                        </div>


                        <div className="pago-row">

                            <div className="form-group">

                                <label htmlFor="expiry">
                                    Vencimiento
                                </label>

                                <input
                                    id="expiry"
                                    type="text"
                                    value={vencimiento}
                                    onChange={(event) =>
                                        setVencimiento(
                                            event.target.value
                                        )
                                    }
                                    placeholder="MM/AA"
                                />

                            </div>


                            <div className="form-group">

                                <label htmlFor="cvv">
                                    CVV
                                </label>

                                <input
                                    id="cvv"
                                    type="text"
                                    value={cvv}
                                    onChange={(event) =>
                                        setCvv(
                                            event.target.value
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
                            disabled={procesando}
                        >
                            {procesando
                                ? "Procesando matrícula..."
                                : "Confirmar matrícula"}
                        </button>

                    </form>

                </section>

            </div>

        </main>
    );
}

export default Pago;