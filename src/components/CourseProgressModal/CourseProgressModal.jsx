import {
    useEffect,
    useState
} from "react";

import { useTheme } from "../../context/ThemeContext";

import {
    actualizarMatricula
} from "../../services/matriculasService";

import "./CourseProgressModal.css";

function CourseProgressModal({
    curso,
    onClose,
    onUpdated
}) {
    const { preferencias, t } = useTheme();

    const idiomaIngles =
        preferencias.idioma === "en";

    const [temasVistos, setTemasVistos] =
        useState([]);

    const [tareasCompletadas, setTareasCompletadas] =
        useState([]);

    const [progreso, setProgreso] =
        useState(0);

    const [guardando, setGuardando] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (!curso) return;

        setTemasVistos(
            curso.temasVistos || []
        );

        setTareasCompletadas(
            curso.tareasCompletadas || []
        );

        setProgreso(
            Number(curso.progreso || 0)
        );

        setError("");
    }, [curso]);

    useEffect(() => {
        if (!curso) return;

        const handleEscape = (event) => {
            if (
                event.key === "Escape" &&
                !guardando
            ) {
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
    }, [
        curso,
        onClose,
        guardando
    ]);

    if (!curso) {
        return null;
    }

    const temas =
        curso.temas || [];

    const tareas =
        curso.tareas || [];

    const totalElementos =
        temas.length + tareas.length;

    const elementosCompletados =
        temasVistos.length +
        tareasCompletadas.length;

    const nombreCurso =
        idiomaIngles && curso.nombre_en
            ? curso.nombre_en
            : curso.nombre;

    const categoriaCurso =
        idiomaIngles && curso.categoria_en
            ? curso.categoria_en
            : curso.categoria;

    const duracionCurso =
        idiomaIngles && curso.duracion_en
            ? curso.duracion_en
            : curso.duracion;

    const modalidadCurso =
        idiomaIngles && curso.modalidad_en
            ? curso.modalidad_en
            : curso.modalidad;

    const texto =
        idiomaIngles
            ? {
                elementos: "elements completed",
                activo: "Active",
                completado: "Completed",
                guardando: "Saving...",
                guardar: "Save progress",
                finalizar: "Finish course",
                cerrar: "Close",
                error: "Progress could not be saved."
            }
            : {
                elementos: "elementos completados",
                activo: "Activo",
                completado: "Completado",
                guardando: "Guardando...",
                guardar: "Guardar progreso",
                finalizar: "Finalizar curso",
                cerrar: "Cerrar",
                error: "No se pudo guardar el progreso."
            };

    const obtenerNombreTema = (tema) => {
        if (
            idiomaIngles &&
            tema.nombre_en
        ) {
            return tema.nombre_en;
        }

        return tema.nombre;
    };

    const obtenerDescripcionTema = (tema) => {
        if (
            idiomaIngles &&
            tema.descripcion_en
        ) {
            return tema.descripcion_en;
        }

        return tema.descripcion;
    };

    const obtenerNombreTarea = (tarea) => {
        if (
            idiomaIngles &&
            tarea.nombre_en
        ) {
            return tarea.nombre_en;
        }

        return tarea.nombre;
    };

    const obtenerDescripcionTarea = (tarea) => {
        if (
            idiomaIngles &&
            tarea.descripcion_en
        ) {
            return tarea.descripcion_en;
        }

        return tarea.descripcion;
    };

    const calcularProgreso = (
        nuevosTemas,
        nuevasTareas
    ) => {
        const completados =
            nuevosTemas.length +
            nuevasTareas.length;

        if (totalElementos === 0) {
            return 0;
        }

        return Math.min(
            100,
            Math.round(
                (completados /
                    totalElementos) *
                    100
            )
        );
    };

    const alternarTema = (temaId) => {
        const yaVisto =
            temasVistos.includes(temaId);

        const nuevosTemas = yaVisto
            ? temasVistos.filter(
                (id) => id !== temaId
            )
            : [
                ...temasVistos,
                temaId
            ];

        setTemasVistos(
            nuevosTemas
        );

        setProgreso(
            calcularProgreso(
                nuevosTemas,
                tareasCompletadas
            )
        );

        setError("");
    };

    const alternarTarea = (tareaId) => {
        const yaCompletada =
            tareasCompletadas.includes(
                tareaId
            );

        const nuevasTareas =
            yaCompletada
                ? tareasCompletadas.filter(
                    (id) =>
                        id !== tareaId
                )
                : [
                    ...tareasCompletadas,
                    tareaId
                ];

        setTareasCompletadas(
            nuevasTareas
        );

        setProgreso(
            calcularProgreso(
                temasVistos,
                nuevasTareas
            )
        );

        setError("");
    };

    const guardarProgreso = async () => {
        try {
            setGuardando(true);
            setError("");

            const nuevosDatos = {
                progreso,
                temasVistos,
                tareasCompletadas,
                estado:
                    progreso === 100
                        ? "Completado"
                        : "Activo"
            };

            await actualizarMatricula(
                curso.matriculaId,
                nuevosDatos
            );

            if (onUpdated) {
                onUpdated({
                    ...curso,
                    ...nuevosDatos
                });
            }

            // Se cierra únicamente después
            // de confirmar que se guardó correctamente.
            onClose();

        } catch (error) {
            console.error(error);

            setError(
                t("errorGuardarProgreso") ||
                texto.error
            );

        } finally {
            setGuardando(false);
        }
    };

    const finalizarCurso = async () => {
        try {
            setGuardando(true);
            setError("");

            const todosLosTemas =
                temas.map(
                    (tema) => tema.id
                );

            const todasLasTareas =
                tareas.map(
                    (tarea) => tarea.id
                );

            const nuevosDatos = {
                progreso: 100,
                estado: "Completado",
                temasVistos:
                    todosLosTemas,
                tareasCompletadas:
                    todasLasTareas
            };

            await actualizarMatricula(
                curso.matriculaId,
                nuevosDatos
            );

            if (onUpdated) {
                onUpdated({
                    ...curso,
                    ...nuevosDatos
                });
            }

            onClose();

        } catch (error) {
            console.error(error);

            setError(
                t("errorGuardarProgreso") ||
                texto.error
            );

        } finally {
            setGuardando(false);
        }
    };

    const handleOverlayClick = (event) => {
        if (
            event.target ===
                event.currentTarget &&
            !guardando
        ) {
            onClose();
        }
    };

    return (
        <div
            className={`progress-modal-overlay ${
                preferencias.tema === "oscuro"
                    ? "progress-modal-dark"
                    : "progress-modal-light"
            }`}
            onClick={handleOverlayClick}
        >
            <div className="progress-modal">

                <button
                    type="button"
                    className="progress-modal-close"
                    onClick={onClose}
                    disabled={guardando}
                    aria-label={texto.cerrar}
                >
                    ×
                </button>

                {/* HEADER */}

                <div className="progress-modal-header">

                    <span className="progress-modal-category">
                        {categoriaCurso}
                    </span>

                    <h2>
                        {nombreCurso}
                    </h2>

                    <p>
                        {curso.profesor}
                    </p>

                </div>

                {/* PROGRESO */}

                <div className="progress-summary">

                    <div className="progress-summary-top">

                        <span>
                            {t("progreso")}
                        </span>

                        <strong>
                            {progreso}%
                        </strong>

                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${progreso}%`
                            }}
                        />
                    </div>

                    <span className="progress-elements">
                        {elementosCompletados}{" "}
                        {idiomaIngles
                            ? "of"
                            : "de"}{" "}
                        {totalElementos}{" "}
                        {texto.elementos}
                    </span>

                </div>

                {/* TEMAS */}

                {temas.length > 0 && (
                    <section className="progress-section">

                        <div className="progress-section-header">
                            <h3>
                                {t("temas")}
                            </h3>
                        </div>

                        <div className="progress-list">

                            {temas.map((tema) => {
                                const completado =
                                    temasVistos.includes(
                                        tema.id
                                    );

                                return (
                                    <button
                                        type="button"
                                        key={tema.id}
                                        className={`progress-item ${
                                            completado
                                                ? "completed"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            alternarTema(
                                                tema.id
                                            )
                                        }
                                        disabled={guardando}
                                    >

                                        <span
                                            className={`progress-check ${
                                                completado
                                                    ? "checked"
                                                    : ""
                                            }`}
                                        >
                                            {completado
                                                ? "✓"
                                                : ""}
                                        </span>

                                        <span className="progress-item-content">

                                            <strong>
                                                {obtenerNombreTema(
                                                    tema
                                                )}
                                            </strong>

                                            {obtenerDescripcionTema(
                                                tema
                                            ) && (
                                                <small>
                                                    {
                                                        obtenerDescripcionTema(
                                                            tema
                                                        )
                                                    }
                                                </small>
                                            )}

                                        </span>

                                    </button>
                                );
                            })}

                        </div>

                    </section>
                )}

                {/* TAREAS */}

                {tareas.length > 0 && (
                    <section className="progress-section">

                        <div className="progress-section-header">
                            <h3>
                                {t("tareas")}
                            </h3>
                        </div>

                        <div className="progress-list">

                            {tareas.map((tarea) => {
                                const completada =
                                    tareasCompletadas.includes(
                                        tarea.id
                                    );

                                return (
                                    <button
                                        type="button"
                                        key={tarea.id}
                                        className={`progress-item ${
                                            completada
                                                ? "completed"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            alternarTarea(
                                                tarea.id
                                            )
                                        }
                                        disabled={guardando}
                                    >

                                        <span
                                            className={`progress-check ${
                                                completada
                                                    ? "checked"
                                                    : ""
                                            }`}
                                        >
                                            {completada
                                                ? "✓"
                                                : ""}
                                        </span>

                                        <span className="progress-item-content">

                                            <strong>
                                                {obtenerNombreTarea(
                                                    tarea
                                                )}
                                            </strong>

                                            {obtenerDescripcionTarea(
                                                tarea
                                            ) && (
                                                <small>
                                                    {
                                                        obtenerDescripcionTarea(
                                                            tarea
                                                        )
                                                    }
                                                </small>
                                            )}

                                        </span>

                                    </button>
                                );
                            })}

                        </div>

                    </section>
                )}

                {/* DETALLES */}

                <div className="progress-details">

                    <div>
                        <span>
                            {t("duracion")}
                        </span>

                        <strong>
                            {duracionCurso}
                        </strong>
                    </div>

                    <div>
                        <span>
                            {t("modalidad")}
                        </span>

                        <strong>
                            {modalidadCurso}
                        </strong>
                    </div>

                    <div>
                        <span>
                            {t("estado")}
                        </span>

                        <strong>
                            {progreso === 100
                                ? texto.completado
                                : texto.activo}
                        </strong>
                    </div>

                </div>

                {error && (
                    <div className="progress-error">
                        {error}
                    </div>
                )}

                {/* ACCIONES */}

                <div className="progress-actions">

                    <button
                        type="button"
                        className="progress-save-button"
                        onClick={guardarProgreso}
                        disabled={guardando}
                    >
                        {guardando
                            ? texto.guardando
                            : texto.guardar}
                    </button>

                    {progreso < 100 && (
                        <button
                            type="button"
                            className="progress-finish-button"
                            onClick={finalizarCurso}
                            disabled={guardando}
                        >
                            {texto.finalizar}
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
}

export default CourseProgressModal;