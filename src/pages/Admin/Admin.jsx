import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";

import {
    crearCurso
} from "../../services/cursosService";

import "./Admin.css";

function Admin() {
    const { t } = useTheme();

    const [nombre, setNombre] =
        useState("");

    const [categoria, setCategoria] =
        useState("");

    const [profesor, setProfesor] =
        useState("");

    const [duracion, setDuracion] =
        useState("");

    const [modalidad, setModalidad] =
        useState("Virtual");

    const [precio, setPrecio] =
        useState("");

    const [descripcion, setDescripcion] =
        useState("");

    const [temas, setTemas] =
        useState("");

    const [tareas, setTareas] =
        useState("");

    const [error, setError] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const limpiarFormulario = () => {

        setNombre("");
        setCategoria("");
        setProfesor("");
        setDuracion("");
        setModalidad("Virtual");
        setPrecio("");
        setDescripcion("");
        setTemas("");
        setTareas("");
    };

    const manejarCrearCurso =
        async (event) => {

            event.preventDefault();

            setError("");
            setMensaje("");

            if (
                !nombre.trim() ||
                !categoria.trim() ||
                !profesor.trim() ||
                !duracion.trim() ||
                !precio ||
                !descripcion.trim()
            ) {

                setError(
                    t(
                        "completaTodosCampos"
                    )
                );

                return;
            }

            if (
                Number(precio) <= 0
            ) {

                setError(
                    "El precio debe ser mayor que cero."
                );

                return;
            }

            try {

                setLoading(true);

                const temasArray =
                    temas
                        .split("\n")
                        .map(
                            (tema) =>
                                tema.trim()
                        )
                        .filter(Boolean)
                        .map(
                            (
                                nombreTema,
                                index
                            ) => ({
                                id:
                                    index +
                                    1,
                                nombre:
                                    nombreTema
                            })
                        );

                const tareasArray =
                    tareas
                        .split("\n")
                        .map(
                            (tarea) =>
                                tarea.trim()
                        )
                        .filter(Boolean)
                        .map(
                            (
                                nombreTarea,
                                index
                            ) => ({
                                id:
                                    index +
                                    1,
                                nombre:
                                    nombreTarea,
                                descripcion:
                                    "Actividad correspondiente al curso."
                            })
                        );

                await crearCurso({
                    nombre:
                        nombre.trim(),

                    categoria:
                        categoria.trim(),

                    profesor:
                        profesor.trim(),

                    duracion:
                        duracion.trim(),

                    modalidad,

                    precio:
                        Number(precio),

                    descripcion:
                        descripcion.trim(),

                    temas:
                        temasArray,

                    tareas:
                        tareasArray
                });

                setMensaje(
                    t(
                        "cursoCreado"
                    )
                );

                limpiarFormulario();

            } catch (error) {

                console.error(error);

                setError(
                    t(
                        "errorCrearCurso"
                    )
                );

            } finally {

                setLoading(false);
            }
        };

    return (
        <main className="admin-page">

            <div className="admin-container">

                <section className="admin-header">

                    <span className="admin-label">
                        {t(
                            "administracion"
                        ).toUpperCase()}
                    </span>

                    <h1>
                        {t(
                            "panelAdministracion"
                        )}
                    </h1>

                    <p>
                        {t(
                            "gestionaOferta"
                        )}
                    </p>

                </section>

                <section className="admin-card">

                    <div className="admin-card-header">

                        <div>

                            <span className="admin-section-label">
                                {t(
                                    "nuevoCurso"
                                )}
                            </span>

                            <h2>
                                {t(
                                    "agregarCurso"
                                )}
                            </h2>

                            <p>
                                {t(
                                    "informacionNuevoCurso"
                                )}
                            </p>

                        </div>

                    </div>

                    <form
                        className="admin-form"
                        onSubmit={
                            manejarCrearCurso
                        }
                    >

                        <div className="admin-form-grid">

                            <div className="admin-form-group">

                                <label htmlFor="nombre">
                                    {t(
                                        "nombreCurso"
                                    )}
                                </label>

                                <input
                                    id="nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={(
                                        event
                                    ) =>
                                        setNombre(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Ej. Desarrollo Frontend"
                                />

                            </div>

                            <div className="admin-form-group">

                                <label htmlFor="categoria">
                                    {t(
                                        "categoria"
                                    )}
                                </label>

                                <input
                                    id="categoria"
                                    type="text"
                                    value={
                                        categoria
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setCategoria(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Ej. Programación"
                                />

                            </div>

                            <div className="admin-form-group">

                                <label htmlFor="profesor">
                                    {t(
                                        "profesor"
                                    )}
                                </label>

                                <input
                                    id="profesor"
                                    type="text"
                                    value={
                                        profesor
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setProfesor(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Nombre del profesor"
                                />

                            </div>

                            <div className="admin-form-group">

                                <label htmlFor="duracion">
                                    {t(
                                        "duracion"
                                    )}
                                </label>

                                <input
                                    id="duracion"
                                    type="text"
                                    value={
                                        duracion
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setDuracion(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Ej. 8 semanas"
                                />

                            </div>

                            <div className="admin-form-group">

                                <label htmlFor="modalidad">
                                    {t(
                                        "modalidad"
                                    )}
                                </label>

                                <select
                                    id="modalidad"
                                    value={
                                        modalidad
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setModalidad(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                >

                                    <option value="Virtual">
                                        Virtual
                                    </option>

                                    <option value="Presencial">
                                        Presencial
                                    </option>

                                    <option value="Híbrida">
                                        Híbrida
                                    </option>

                                </select>

                            </div>

                            <div className="admin-form-group">

                                <label htmlFor="precio">
                                    {t(
                                        "precio"
                                    )}
                                </label>

                                <input
                                    id="precio"
                                    type="number"
                                    min="1"
                                    value={
                                        precio
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setPrecio(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Ej. 45000"
                                />

                            </div>

                        </div>

                        <div className="admin-form-group">

                            <label htmlFor="descripcion">
                                {t(
                                    "descripcion"
                                )}
                            </label>

                            <textarea
                                id="descripcion"
                                rows="4"
                                value={
                                    descripcion
                                }
                                onChange={(
                                    event
                                ) =>
                                    setDescripcion(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder={
                                    t(
                                        "descripcionCurso"
                                    )
                                }
                            />

                        </div>

                        <div className="admin-form-group">

                            <label htmlFor="temas">
                                {t(
                                    "temasCurso"
                                )}
                            </label>

                            <textarea
                                id="temas"
                                rows="5"
                                value={temas}
                                onChange={(
                                    event
                                ) =>
                                    setTemas(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder={
                                    `Un tema por línea\nIntroducción\nComponentes\nProyecto final`
                                }
                            />

                            <span className="admin-help">
                                {t(
                                    "unTemaLinea"
                                )}
                            </span>

                        </div>

                        <div className="admin-form-group">

                            <label htmlFor="tareas">
                                {t(
                                    "tareas"
                                )}
                            </label>

                            <textarea
                                id="tareas"
                                rows="5"
                                value={tareas}
                                onChange={(
                                    event
                                ) =>
                                    setTareas(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder={
                                    `Una tarea por línea\nEjercicio de componentes\nPráctica final`
                                }
                            />

                            <span className="admin-help">
                                {t(
                                    "unaTareaLinea"
                                )}
                            </span>

                        </div>

                        {error && (
                            <p className="admin-error">
                                {error}
                            </p>
                        )}

                        {mensaje && (
                            <p className="admin-success">
                                {mensaje}
                            </p>
                        )}

                        <div className="admin-form-footer">

                            <span>
                                {t(
                                    "completaTodosCampos"
                                )}
                            </span>

                            <button
                                type="submit"
                                className="admin-submit"
                                disabled={loading}
                            >
                                {loading
                                    ? t(
                                        "publicando"
                                    )
                                    : t(
                                        "publicarCurso"
                                    )}
                            </button>

                        </div>

                    </form>

                </section>

            </div>

        </main>
    );
}

export default Admin;