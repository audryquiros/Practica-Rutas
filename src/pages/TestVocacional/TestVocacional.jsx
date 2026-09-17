import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";
import {
    preguntasVocacionales,
    obtenerRecomendaciones
} from "../../services/vocacionalService";

import "./TestVocacional.css";

function TestVocacional() {
    const { preferencias, t } = useTheme();
    const navigate = useNavigate();

    const idioma = preferencias.idioma;

    const [preguntaActual, setPreguntaActual] = useState(0);
    const [respuestas, setRespuestas] = useState([]);
    const [analizando, setAnalizando] = useState(false);
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [finalizado, setFinalizado] = useState(false);
    const [error, setError] = useState("");

    const pregunta = preguntasVocacionales[preguntaActual];

    const totalPreguntas = preguntasVocacionales.length;

    const progreso =
        ((preguntaActual + 1) / totalPreguntas) * 100;

    const respuestaSeleccionada =
        respuestas[preguntaActual] || null;

    const seleccionarRespuesta = (opcion) => {
        const nuevasRespuestas = [...respuestas];

        nuevasRespuestas[preguntaActual] = opcion;

        setRespuestas(nuevasRespuestas);
        setError("");

        /*
         * Avance automático:
         * si no estamos en la última pregunta,
         * pasamos a la siguiente después de seleccionar.
         */
        if (preguntaActual < totalPreguntas - 1) {
            setTimeout(() => {
                setPreguntaActual((actual) => actual + 1);
            }, 220);
        }
    };

    const volverPreguntaAnterior = () => {
        if (preguntaActual > 0) {
            setPreguntaActual(
                (actual) => actual - 1
            );
        }
    };

    const analizarTest = async () => {
        const respuestasCompletas =
            respuestas.length === totalPreguntas &&
            respuestas.every(Boolean);

        if (!respuestasCompletas) {
            setError(
                idioma === "en"
                    ? "Please answer all questions before continuing."
                    : "Responde todas las preguntas antes de continuar."
            );

            return;
        }

        try {
            setAnalizando(true);
            setError("");

            const resultado =
                await obtenerRecomendaciones(
                    respuestas
                );

            setRecomendaciones(resultado);
            setFinalizado(true);
        } catch (error) {
            console.error(error);

            setError(
                idioma === "en"
                    ? "We could not generate your recommendations."
                    : "No pudimos generar tus recomendaciones."
            );
        } finally {
            setAnalizando(false);
        }
    };

    const reiniciarTest = () => {
        setPreguntaActual(0);
        setRespuestas([]);
        setRecomendaciones([]);
        setFinalizado(false);
        setAnalizando(false);
        setError("");
    };

    const obtenerNombreCurso = (curso) => {
        return curso.nombre;
    };

    const obtenerDescripcionCurso = (curso) => {
        return curso.descripcion;
    };

    if (finalizado) {
        return (
            <main className="vocacional-page">
                <div className="vocacional-container">

                    <section className="vocacional-result-header">

                        <span className="vocacional-label">
                            {idioma === "en"
                                ? "VOCATIONAL PROFILE"
                                : "PERFIL VOCACIONAL"}
                        </span>

                        <h1>
                            {idioma === "en"
                                ? "Your recommendations"
                                : "Tus recomendaciones"}
                        </h1>

                        <p>
                            {idioma === "en"
                                ? "Based on your answers, these courses may be a good fit for your interests."
                                : "Según tus respuestas, estos cursos pueden ser una buena opción para tus intereses."}
                        </p>

                    </section>

                    {recomendaciones.length > 0 ? (
                        <section className="vocacional-recommendations">

                            {recomendaciones.map(
                                (curso, index) => (
                                    <article
                                        key={curso.id}
                                        className="vocacional-recommendation-card"
                                    >

                                        <span className="vocacional-recommendation-number">
                                            0{index + 1}
                                        </span>

                                        <span className="vocacional-course-category">
                                            {curso.categoria}
                                        </span>

                                        <h2>
                                            {obtenerNombreCurso(
                                                curso
                                            )}
                                        </h2>

                                        <p>
                                            {obtenerDescripcionCurso(
                                                curso
                                            )}
                                        </p>

                                        <div className="vocacional-course-meta">
                                            <span>
                                                {curso.duracion}
                                            </span>

                                            <span>
                                                ₡
                                                {Number(
                                                    curso.precio
                                                ).toLocaleString(
                                                    "es-CR"
                                                )}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            className="vocacional-course-button"
                                            onClick={() =>
                                                navigate(
                                                    `/pago/${curso.id}`
                                                )
                                            }
                                        >
                                            {idioma === "en"
                                                ? "View course"
                                                : "Ver curso"}
                                        </button>

                                    </article>
                                )
                            )}

                        </section>
                    ) : (
                        <div className="vocacional-empty">

                            <h2>
                                {idioma === "en"
                                    ? "No recommendations available"
                                    : "No encontramos recomendaciones"}
                            </h2>

                            <p>
                                {idioma === "en"
                                    ? "Try taking the test again with different answers."
                                    : "Puedes realizar nuevamente el test con otras respuestas."}
                            </p>

                        </div>
                    )}

                    <div className="vocacional-result-actions">

                        <button
                            type="button"
                            className="vocacional-secondary-button"
                            onClick={reiniciarTest}
                        >
                            {idioma === "en"
                                ? "Take the test again"
                                : "Repetir test"}
                        </button>

                        <Link
                            to="/dashboard"
                            className="vocacional-primary-button"
                        >
                            {idioma === "en"
                                ? "Go to my courses"
                                : "Ir a mis cursos"}
                        </Link>

                    </div>

                </div>
            </main>
        );
    }

    return (
        <main className="vocacional-page">

            <div className="vocacional-container">

                {/* ENCABEZADO */}

                <section className="vocacional-header">

                    <Link
                        to="/dashboard"
                        className="vocacional-back"
                    >
                        {idioma === "en"
                            ? "Back to my courses"
                            : "Volver a mis cursos"}
                    </Link>

                    <span className="vocacional-label">
                        {idioma === "en"
                            ? "VOCATIONAL TEST"
                            : "TEST VOCACIONAL"}
                    </span>

                    <h1>
                        {idioma === "en"
                            ? "Discover what you could learn next."
                            : "Descubre qué podrías aprender."}
                    </h1>

                    <p>
                        {idioma === "en"
                            ? "Answer a few questions and we will recommend courses based on your interests."
                            : "Responde algunas preguntas y te recomendaremos cursos según tus intereses."}
                    </p>

                </section>

                {/* PROGRESO */}

                <section className="vocacional-progress">

                    <div className="vocacional-progress-top">

                        <span>
                            {idioma === "en"
                                ? `Question ${preguntaActual + 1} of ${totalPreguntas}`
                                : `Pregunta ${preguntaActual + 1} de ${totalPreguntas}`}
                        </span>

                        <span>
                            {Math.round(progreso)}%
                        </span>

                    </div>

                    <div className="vocacional-progress-track">

                        <div
                            className="vocacional-progress-bar"
                            style={{
                                width: `${progreso}%`
                            }}
                        />

                    </div>

                </section>

                {/* PREGUNTA */}

                <section className="vocacional-question-card">

                    <span className="vocacional-question-number">
                        {String(
                            preguntaActual + 1
                        ).padStart(2, "0")}
                    </span>

                    <h2>
                        {idioma === "en"
                            ? pregunta.preguntaEn
                            : pregunta.pregunta}
                    </h2>

                    <p className="vocacional-question-help">
                        {idioma === "en"
                            ? "Select the option that best represents you."
                            : "Selecciona la opción que mejor te represente."}
                    </p>

                    <div className="vocacional-options">

                        {pregunta.opciones.map(
                            (opcion, index) => {

                                const seleccionada =
                                    respuestaSeleccionada ===
                                    opcion;

                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={`vocacional-option ${
                                            seleccionada
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            seleccionarRespuesta(
                                                opcion
                                            )
                                        }
                                    >

                                        <span className="vocacional-option-letter">
                                            {String.fromCharCode(
                                                65 + index
                                            )}
                                        </span>

                                        <span className="vocacional-option-text">
                                            {idioma === "en"
                                                ? opcion.textoEn
                                                : opcion.texto}
                                        </span>

                                        {seleccionada && (
                                            <span className="vocacional-option-check">
                                                ✓
                                            </span>
                                        )}

                                    </button>
                                );
                            }
                        )}

                    </div>

                    {error && (
                        <p className="vocacional-error">
                            {error}
                        </p>
                    )}

                    {/* CONTROLES */}

                    <div className="vocacional-navigation">

                        <button
                            type="button"
                            className="vocacional-secondary-button"
                            onClick={
                                volverPreguntaAnterior
                            }
                            disabled={
                                preguntaActual === 0
                            }
                        >
                            {idioma === "en"
                                ? "Previous"
                                : "Anterior"}
                        </button>

                        {preguntaActual ===
                            totalPreguntas - 1 && (
                            <button
                                type="button"
                                className="vocacional-primary-button"
                                onClick={
                                    analizarTest
                                }
                                disabled={
                                    !respuestaSeleccionada ||
                                    analizando
                                }
                            >
                                {analizando
                                    ? idioma === "en"
                                        ? "Analyzing..."
                                        : "Analizando..."
                                    : idioma === "en"
                                    ? "See my recommendations"
                                    : "Ver mis recomendaciones"}
                            </button>
                        )}

                    </div>

                </section>

                {/* INDICADOR */}

                <p className="vocacional-auto-next">
                    {preguntaActual <
                    totalPreguntas - 1
                        ? idioma === "en"
                            ? "Your answer will automatically take you to the next question."
                            : "Al seleccionar una respuesta avanzarás automáticamente a la siguiente pregunta."
                        : idioma === "en"
                        ? "This is the last question."
                        : "Esta es la última pregunta."}
                </p>

            </div>

        </main>
    );
}

export default TestVocacional;