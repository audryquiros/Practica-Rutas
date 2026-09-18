import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    obtenerCursos,
    crearCurso,
    actualizarCurso,
    eliminarCurso
} from "../../services/cursosService";
import "./CursosAdmin.css";

const formularioInicial = {
    nombre: "",
    categoria: "",
    profesor: "",
    duracion: "",
    modalidad: "Virtual",
    precio: "",
    descripcion: "",
    areas: "",
    temas: "",
    tareas: ""
};

function CursosAdmin() {
    const navigate = useNavigate();

    const [cursos, setCursos] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);

    const [cursoEditando, setCursoEditando] = useState(null);
    const [formularioAbierto, setFormularioAbierto] = useState(false);

    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarCursos();
    }, []);

    const cargarCursos = async () => {
        try {
            setCargando(true);
            setError("");

            const datos = await obtenerCursos();

            setCursos(datos);
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar los cursos.");
        } finally {
            setCargando(false);
        }
    };

    const manejarCambio = (event) => {
        const { name, value } = event.target;

        setFormulario((actual) => ({
            ...actual,
            [name]: value
        }));
    };

    const prepararCurso = () => {
        return {
            nombre: formulario.nombre.trim(),
            categoria: formulario.categoria.trim(),
            profesor: formulario.profesor.trim(),
            duracion: formulario.duracion.trim(),
            modalidad: formulario.modalidad,
            precio: Number(formulario.precio),
            descripcion: formulario.descripcion.trim(),

            areas: formulario.areas
                .split(",")
                .map((area) => area.trim())
                .filter(Boolean),

            temas: formulario.temas
                .split("\n")
                .map((tema) => tema.trim())
                .filter(Boolean),

            tareas: formulario.tareas
                .split("\n")
                .map((tarea) => tarea.trim())
                .filter(Boolean)
        };
    };

    const validarFormulario = () => {
        if (
            !formulario.nombre.trim() ||
            !formulario.categoria.trim() ||
            !formulario.profesor.trim() ||
            !formulario.duracion.trim() ||
            !formulario.precio ||
            !formulario.descripcion.trim()
        ) {
            setError(
                "Completa todos los campos obligatorios del curso."
            );

            return false;
        }

        if (Number(formulario.precio) <= 0) {
            setError("El precio debe ser mayor que cero.");
            return false;
        }

        return true;
    };

    const abrirFormulario = () => {
        setFormularioAbierto(true);
        setCursoEditando(null);
        setFormulario(formularioInicial);
        setError("");
        setMensaje("");

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 50);
    };

    const cerrarFormulario = () => {
        setFormularioAbierto(false);
        setCursoEditando(null);
        setFormulario(formularioInicial);

        setError("");
        setMensaje("");
    };

    const manejarSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setMensaje("");

        if (!validarFormulario()) {
            return;
        }

        try {
            setGuardando(true);

            const curso = prepararCurso();

            if (cursoEditando) {
                await actualizarCurso(
                    cursoEditando.id,
                    curso
                );

                setMensaje(
                    "El curso se actualizó correctamente."
                );
            } else {
                await crearCurso(curso);

                setMensaje(
                    "El curso se creó correctamente."
                );
            }

            setFormulario(formularioInicial);
            setCursoEditando(null);

            await cargarCursos();

            setFormularioAbierto(false);

        } catch (error) {
            console.error(error);

            setError(
                cursoEditando
                    ? "No se pudo actualizar el curso."
                    : "No se pudo crear el curso."
            );
        } finally {
            setGuardando(false);
        }
    };

    const manejarEditar = (curso) => {
        setCursoEditando(curso);
        setFormularioAbierto(true);

        setFormulario({
            nombre: curso.nombre || "",
            categoria: curso.categoria || "",
            profesor: curso.profesor || "",
            duracion: curso.duracion || "",
            modalidad: curso.modalidad || "Virtual",
            precio: curso.precio || "",
            descripcion: curso.descripcion || "",

            areas: Array.isArray(curso.areas)
                ? curso.areas.join(", ")
                : curso.areas || "",

            temas: Array.isArray(curso.temas)
                ? curso.temas.join("\n")
                : curso.temas || "",

            tareas: Array.isArray(curso.tareas)
                ? curso.tareas.join("\n")
                : curso.tareas || ""
        });

        setMensaje("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const manejarEliminar = async (curso) => {
        const confirmar = window.confirm(
            `¿Seguro que deseas eliminar el curso "${curso.nombre}"?`
        );

        if (!confirmar) {
            return;
        }

        try {
            setError("");
            setMensaje("");

            await eliminarCurso(curso.id);

            setCursos((actuales) =>
                actuales.filter(
                    (item) => item.id !== curso.id
                )
            );

            if (cursoEditando?.id === curso.id) {
                cerrarFormulario();
            }

            setMensaje(
                "El curso se eliminó correctamente."
            );
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo eliminar el curso."
            );
        }
    };

    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat("es-CR", {
            style: "currency",
            currency: "CRC",
            maximumFractionDigits: 0
        }).format(Number(precio) || 0);
    };

    return (
        <main className="cursos-admin-page">
            <div className="cursos-admin-container">

                <button
                    type="button"
                    className="admin-back-button"
                    onClick={() => navigate("/admin")}
                >
                    <span>←</span>
                    Volver al panel
                </button>

                <header className="cursos-admin-header">

                    <div>
                        <span className="cursos-admin-eyebrow">
                            ADMINISTRACIÓN
                        </span>

                        <h1>
                            Gestión de cursos
                        </h1>

                        <p>
                            Crea nuevos cursos o administra los
                            cursos existentes de Learnix.
                        </p>
                    </div>

                    <div className="cursos-header-actions">

                        <button
                            type="button"
                            className="add-course-button"
                            onClick={abrirFormulario}
                        >
                            <span>+</span>
                            Agregar curso
                        </button>

                        <div className="cursos-total">
                            <span>CURSOS</span>

                            <strong>
                                {cursos.length}
                            </strong>
                        </div>

                    </div>

                </header>

                {error && (
                    <div className="cursos-admin-message error">
                        {error}
                    </div>
                )}

                {mensaje && (
                    <div className="cursos-admin-message success">
                        {mensaje}
                    </div>
                )}

                {formularioAbierto && (
                    <section className="curso-form-section">

                        <div className="section-heading">

                            <div>
                                <span className="section-number">
                                    {cursoEditando
                                        ? "EDITAR CURSO"
                                        : "NUEVO CURSO"}
                                </span>

                                <h2>
                                    {cursoEditando
                                        ? "Editar curso"
                                        : "Agregar curso"}
                                </h2>
                            </div>

                            <button
                                type="button"
                                className="close-form-button"
                                onClick={cerrarFormulario}
                            >
                                Cerrar
                            </button>

                        </div>

                        <form
                            className="curso-form"
                            onSubmit={manejarSubmit}
                        >

                            <div className="form-grid">

                                <div className="form-group">
                                    <label htmlFor="nombre">
                                        Nombre del curso
                                    </label>

                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                        placeholder="Ej. Python para principiantes"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="categoria">
                                        Categoría
                                    </label>

                                    <input
                                        id="categoria"
                                        name="categoria"
                                        type="text"
                                        value={formulario.categoria}
                                        onChange={manejarCambio}
                                        placeholder="Ej. Programación"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="profesor">
                                        Profesor
                                    </label>

                                    <input
                                        id="profesor"
                                        name="profesor"
                                        type="text"
                                        value={formulario.profesor}
                                        onChange={manejarCambio}
                                        placeholder="Nombre del profesor"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="duracion">
                                        Duración
                                    </label>

                                    <input
                                        id="duracion"
                                        name="duracion"
                                        type="text"
                                        value={formulario.duracion}
                                        onChange={manejarCambio}
                                        placeholder="Ej. 8 semanas"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="modalidad">
                                        Modalidad
                                    </label>

                                    <select
                                        id="modalidad"
                                        name="modalidad"
                                        value={formulario.modalidad}
                                        onChange={manejarCambio}
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

                                <div className="form-group">
                                    <label htmlFor="precio">
                                        Precio
                                    </label>

                                    <div className="price-input">
                                        <span>₡</span>

                                        <input
                                            id="precio"
                                            name="precio"
                                            type="number"
                                            min="1"
                                            value={formulario.precio}
                                            onChange={manejarCambio}
                                            placeholder="45000"
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="form-group full-width">

                                <label htmlFor="areas">
                                    Áreas
                                </label>

                                <input
                                    id="areas"
                                    name="areas"
                                    type="text"
                                    value={formulario.areas}
                                    onChange={manejarCambio}
                                    placeholder="programacion, logica"
                                />

                                <small>
                                    Separa las áreas con comas.
                                    También se utilizan para el test vocacional.
                                </small>

                            </div>

                            <div className="form-group full-width">

                                <label htmlFor="descripcion">
                                    Descripción
                                </label>

                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formulario.descripcion}
                                    onChange={manejarCambio}
                                    placeholder="Descripción del curso..."
                                    rows="4"
                                />

                            </div>

                            <div className="form-grid">

                                <div className="form-group">

                                    <label htmlFor="temas">
                                        Temas
                                    </label>

                                    <textarea
                                        id="temas"
                                        name="temas"
                                        value={formulario.temas}
                                        onChange={manejarCambio}
                                        placeholder={
                                            "Introducción\nComponentes\nProyecto final"
                                        }
                                        rows="5"
                                    />

                                    <small>
                                        Un tema por línea.
                                    </small>

                                </div>

                                <div className="form-group">

                                    <label htmlFor="tareas">
                                        Tareas
                                    </label>

                                    <textarea
                                        id="tareas"
                                        name="tareas"
                                        value={formulario.tareas}
                                        onChange={manejarCambio}
                                        placeholder={
                                            "Ejercicio de componentes\nPráctica de estado\nProyecto final"
                                        }
                                        rows="5"
                                    />

                                    <small>
                                        Una tarea por línea.
                                    </small>

                                </div>

                            </div>

                            <div className="form-footer">

                                <p>
                                    Los campos del curso se
                                    guardan en JSON Server.
                                </p>

                                <div className="form-actions">

                                    <button
                                        type="button"
                                        className="cancel-form-button"
                                        onClick={cerrarFormulario}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="save-course-button"
                                        disabled={guardando}
                                    >
                                        {guardando
                                            ? "Guardando..."
                                            : cursoEditando
                                                ? "Guardar cambios"
                                                : "Crear curso"}
                                    </button>

                                </div>

                            </div>

                        </form>

                    </section>
                )}

                <section className="courses-list-section">

                    <div className="courses-list-header">

                        <div>
                            <span className="section-number">
                                CURSOS REGISTRADOS
                            </span>

                            <h2>
                                Cursos de Learnix
                            </h2>

                            <p>
                                Administra los cursos disponibles
                                en la plataforma.
                            </p>
                        </div>

                        <span className="courses-count">
                            {cursos.length}
                        </span>

                    </div>

                    {cargando ? (
                        <div className="courses-loading">
                            Cargando cursos...
                        </div>
                    ) : cursos.length === 0 ? (
                        <div className="courses-empty">
                            No hay cursos registrados.
                        </div>
                    ) : (
                        <div className="courses-table-wrapper">

                            <table className="courses-table">

                                <thead>
                                    <tr>
                                        <th>Curso</th>
                                        <th>Categoría</th>
                                        <th>Profesor</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {cursos.map((curso) => (
                                        <tr key={curso.id}>

                                            <td>
                                                <div className="course-name">
                                                    {curso.nombre}
                                                </div>
                                            </td>

                                            <td>
                                                <span className="course-category">
                                                    {curso.categoria}
                                                </span>
                                            </td>

                                            <td>
                                                {curso.profesor || "—"}
                                            </td>

                                            <td>
                                                <span className="course-price">
                                                    {formatearPrecio(
                                                        curso.precio
                                                    )}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="course-actions">

                                                    <button
                                                        type="button"
                                                        className="edit-button"
                                                        onClick={() =>
                                                            manejarEditar(curso)
                                                        }
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="delete-button"
                                                        onClick={() =>
                                                            manejarEliminar(curso)
                                                        }
                                                    >
                                                        Eliminar
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </section>

            </div>
        </main>
    );
}

export default CursosAdmin;