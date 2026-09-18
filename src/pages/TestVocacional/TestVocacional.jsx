import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useCurrency } from "../../context/CurrencyContext";
import {
    preguntasVocacionales,
    obtenerRecomendaciones
} from "../../services/vocacionalService";
import "./TestVocacional.css";

function TestVocacional() {
    const { idioma } = useLanguage();
    const { formatearPrecio } = useCurrency();
    const navigate = useNavigate();

    const idiomaIngles =
        idioma === "en";

    const [preguntaActual, setPreguntaActual] =
        useState(0);

    const [respuestas, setRespuestas] =
        useState([]);

    const [resultado, setResultado] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const pregunta =
        preguntasVocacionales[preguntaActual];

    const progreso =
        ((preguntaActual + 1) /
            preguntasVocacionales.length) *
        100;

    const seleccionarRespuesta = (opcion) => {
        const nuevasRespuestas = [
            ...respuestas
        ];

        nuevasRespuestas[preguntaActual] =
            opcion;

        setRespuestas(nuevasRespuestas);
        setError("");

        if (
            preguntaActual <
            preguntasVocacionales.length - 1
        ) {
            setTimeout(() => {
                setPreguntaActual(
                    preguntaActual + 1
                );
            }, 220);

            return;
        }

        procesarResultado(
            nuevasRespuestas
        );
    };

    const volverPregunta = () => {
        if (preguntaActual === 0) {
            return;
        }

        setPreguntaActual(
            preguntaActual - 1
        );
    };

    const procesarResultado = async (
        respuestasFinales
    ) => {
        try {
            setLoading(true);
            setError("");

            const resultadoIA =
                await obtenerRecomendaciones(
                    respuestasFinales
                );

            setResultado(resultadoIA);
        } catch (error) {
            console.error(
                "Error obteniendo recomendaciones:",
                error
            );

            setError(
                idiomaIngles
                    ? "We could not process your vocational test. Please try again."
                    : "No pudimos procesar tu test vocacional. Inténtalo nuevamente."
            );
        } finally {
            setLoading(false);
        }
    };

    const reiniciarTest = () => {
        setPreguntaActual(0);
        setRespuestas([]);
        setResultado(null);
        setError("");
    };

    /* =========================
       CARGANDO IA
    ========================= */

    if (loading) {
        return (
            <main className="vocacional-page">
                <section className="vocacional-container">
                    <div className="vocacional-loading">
                        <span className="vocacional-label">
                            LEARNIX
                        </span>

                        <h1>
                            {idiomaIngles
                                ? "Analyzing your answers"
                                : "Analizando tus respuestas"}
                        </h1>

                        <p>
                            {idiomaIngles
                                ? "Our AI is creating your personalized recommendations."
                                : "Nuestra IA está creando recomendaciones personalizadas para ti."}
                        </p>

                        <div className="vocacional-loading-line">
                            <span />
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    /* =========================
       RESULTADO DE LA IA
    ========================= */

    if (resultado) {
        return (
            <main className="vocacional-page">
                <section className="vocacional-container">

                    <div className="vocacional-result-header">
                        <span className="vocacional-label">
                            {idiomaIngles
                                ? "YOUR VOCATIONAL PROFILE"
                                : "TU PERFIL VOCACIONAL"}
                        </span>

                        <h1>
                            {resultado.perfil}
                        </h1>

                        <p>
                            {resultado.descripcion}
                        </p>
                    </div>

                    <div className="vocacional-result-title">
                        <h2>
                            {idiomaIngles
                                ? "Recommended courses"
                                : "Cursos recomendados"}
                        </h2>

                        <p>
                            {idiomaIngles
                                ? "Based on your answers, our AI identified these courses as relevant to your interests."
                                : "Según tus respuestas, nuestra IA identificó estos cursos como relacionados con tus intereses."}
                        </p>
                    </div>

                    {resultado.recomendaciones?.length > 0 ? (
                        <div className="vocacional-recommendations">
                            {resultado.recomendaciones.map(
                                (curso, index) => (
                                    <article
                                        className="vocacional-recommendation-card"
                                        key={curso.id}
                                    >
                                        <span className="recommendation-number">
                                            {String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <div className="recommendation-content">
                                            <span className="recommendation-category">
                                                {
                                                    idiomaIngles && curso.categoria_en
                                                        ? curso.categoria_en
                                                        : curso.categoria
                                                }
                                            </span>

                                            <h3>
                                                {
                                                    idiomaIngles && curso.nombre_en
                                                        ? curso.nombre_en
                                                        : curso.nombre
                                                }
                                            </h3>

                                            <p className="recommendation-description">
                                                {
                                                    curso.descripcion
                                                }
                                            </p>

                                            <div className="recommendation-reason">
                                                <span>
                                                    {idiomaIngles
                                                        ? "Why this course?"
                                                        : "¿Por qué este curso?"}
                                                </span>

                                                <p>
                                                    {
                                                        curso.razon
                                                    }
                                                </p>
                                            </div>

                                            <div className="recommendation-footer">
                                                <span>
                                                    {
                                                        curso.duracion
                                                    }
                                                </span>

                                                <span>
                                                    {formatearPrecio(curso.precio)}
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
                                                {idiomaIngles
                                                    ? "View course"
                                                    : "Ver curso"}
                                            </button>
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="vocacional-empty">
                            <h3>
                                {idiomaIngles
                                    ? "No recommendations available"
                                    : "No encontramos recomendaciones"}
                            </h3>

                            <p>
                                {idiomaIngles
                                    ? "Try taking the test again with different answers."
                                    : "Intenta realizar nuevamente el test con otras respuestas."}
                            </p>
                        </div>
                    )}

                    <div className="vocacional-result-actions">
                        <button
                            type="button"
                            className="vocacional-secondary-button"
                            onClick={
                                reiniciarTest
                            }
                        >
                            {idiomaIngles
                                ? "Take the test again"
                                : "Realizar test nuevamente"}
                        </button>

                        <Link
                            to="/dashboard"
                            className="vocacional-primary-button"
                        >
                            {idiomaIngles
                                ? "Go to my dashboard"
                                : "Ir a mi dashboard"}
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    /* =========================
       TEST VOCACIONAL
    ========================= */

    return (
        <main className="vocacional-page">
            <section className="vocacional-container">

                <div className="vocacional-header">
                    <span className="vocacional-label">
                        LEARNIX
                    </span>

                    <h1>
                        {idiomaIngles
                            ? "Vocational test"
                            : "Test vocacional"}
                    </h1>

                    <p>
                        {idiomaIngles
                            ? "Answer these questions and let our AI help you discover courses that match your interests."
                            : "Responde estas preguntas y deja que nuestra IA te ayude a descubrir cursos relacionados con tus intereses."}
                    </p>
                </div>

                <div className="vocacional-progress">

                    <div className="vocacional-progress-info">
                        <span>
                            {idiomaIngles
                                ? `Question ${
                                      preguntaActual +
                                      1
                                  } of ${
                                      preguntasVocacionales.length
                                  }`
                                : `Pregunta ${
                                      preguntaActual +
                                      1
                                  } de ${
                                      preguntasVocacionales.length
                                  }`}
                        </span>

                        <span className="vocacional-progress-percentage">
                            {Math.round(progreso)}%
                        </span>
                    </div>

                    <div className="vocacional-progress-bar">
                        <span
                            style={{
                                width: `${progreso}%`
                            }}
                        />
                    </div>

                </div>

                <div className="vocacional-question-card">

                    <span className="vocacional-question-number">
                        {String(
                            preguntaActual + 1
                        ).padStart(2, "0")}
                    </span>

                    <h2>
                        {idiomaIngles
                            ? pregunta.preguntaEn
                            : pregunta.pregunta}
                    </h2>

                    <div className="vocacional-options">

                        {pregunta.opciones.map(
                            (opcion, index) => {

                                const seleccionada =
                                    respuestas[
                                        preguntaActual
                                    ] === opcion;

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
                                        <span className="option-letter">
                                            {String.fromCharCode(
                                                65 + index
                                            )}
                                        </span>

                                        <span className="option-text">
                                            {idiomaIngles
                                                ? opcion.textoEn
                                                : opcion.texto}
                                        </span>

                                        {seleccionada && (
                                            <span className="option-check">
                                                ✓
                                            </span>
                                        )}
                                    </button>
                                );
                            }
                        )}

                    </div>
                </div>

                {error && (
                    <div className="vocacional-error">
                        <p>{error}</p>

                        <button
                            type="button"
                            onClick={() =>
                                procesarResultado(
                                    respuestas
                                )
                            }
                        >
                            {idiomaIngles
                                ? "Try again"
                                : "Intentar nuevamente"}
                        </button>
                    </div>
                )}

                <div className="vocacional-navigation">

                    <button
                        type="button"
                        className="vocacional-secondary-button"
                        onClick={
                            volverPregunta
                        }
                        disabled={
                            preguntaActual === 0
                        }
                    >
                        {idiomaIngles
                            ? "Previous"
                            : "Anterior"}
                    </button>

                    <span className="vocacional-auto-next">
                        {idiomaIngles
                            ? "Select an answer to continue"
                            : "Selecciona una respuesta para continuar"}
                    </span>

                </div>

            </section>
        </main>
    );
}

export default TestVocacional;