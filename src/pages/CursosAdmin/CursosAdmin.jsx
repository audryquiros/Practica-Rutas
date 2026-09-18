import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCurrency } from "../../context/CurrencyContext";
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
    temas: [""],
    tareas: [{ nombre: "", descripcion: "" }]
};

function CursosAdmin() {
    const navigate = useNavigate();
    const { preferencias, t } = useTheme();
    const { formatearPrecio } = useCurrency();

    const idiomaIngles = preferencias.idioma === "en";

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
            setError(t("errorCargarCursos"));
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

    const agregarTema = () => {
        setFormulario((actual) => ({
            ...actual,
            temas: [...actual.temas, ""]
        }));
    };

    const cambiarTema = (index, valor) => {
        setFormulario((actual) => ({
            ...actual,
            temas: actual.temas.map((tema, i) =>
                i === index ? valor : tema
            )
        }));
    };

    const eliminarTema = (index) => {
        setFormulario((actual) => ({
            ...actual,
            temas:
                actual.temas.length > 1
                    ? actual.temas.filter((_, i) => i !== index)
                    : [""]
        }));
    };

    const agregarTarea = () => {
        setFormulario((actual) => ({
            ...actual,
            tareas: [
                ...actual.tareas,
                { nombre: "", descripcion: "" }
            ]
        }));
    };

    const cambiarTarea = (index, campo, valor) => {
        setFormulario((actual) => ({
            ...actual,
            tareas: actual.tareas.map((tarea, i) =>
                i === index
                    ? { ...tarea, [campo]: valor }
                    : tarea
            )
        }));
    };

    const eliminarTarea = (index) => {
        setFormulario((actual) => ({
            ...actual,
            tareas:
                actual.tareas.length > 1
                    ? actual.tareas.filter((_, i) => i !== index)
                    : [{ nombre: "", descripcion: "" }]
        }));
    };

    const obtenerNombreCurso = (curso) =>
        idiomaIngles && curso?.nombre_en
            ? curso.nombre_en
            : curso?.nombre || "";

    const obtenerCategoriaCurso = (curso) =>
        idiomaIngles && curso?.categoria_en
            ? curso.categoria_en
            : curso?.categoria || "";

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
                .map((tema, index) => ({
                    id: index + 1,
                    nombre: tema.trim()
                }))
                .filter((tema) => tema.nombre),

            tareas: formulario.tareas
                .map((tarea, index) => ({
                    id: index + 1,
                    nombre: tarea.nombre.trim(),
                    descripcion: tarea.descripcion.trim()
                }))
                .filter((tarea) => tarea.nombre || tarea.descripcion)
        };
    };

    const traducirCurso = async (curso) => {
        const response = await fetch("http://localhost:3002/api/traducir-curso", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ curso })
        });

        if (!response.ok) {
            throw new Error("No se pudo traducir el curso automáticamente.");
        }

        return await response.json();
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
                t("camposCursoObligatorios")
            );

            return false;
        }

        if (Number(formulario.precio) <= 0) {
            setError(t("precioMayorCero"));
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

            // El administrador escribe una sola vez en español.
            // La versión en inglés se genera automáticamente y se guarda junto al curso.
            const traduccion = await traducirCurso(curso);

            const cursoConTraduccion = {
                ...curso,
                ...traduccion
            };

            if (cursoEditando) {
                await actualizarCurso(
                    cursoEditando.id,
                    cursoConTraduccion
                );

                setMensaje(
                    t("cursoActualizado")
                );
            } else {
                await crearCurso(cursoConTraduccion);

                setMensaje(
                    t("cursoCreado")
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
                    ? t("errorActualizarCurso")
                    : t("errorCrearCurso")
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
                ? curso.temas.map((tema) =>
                    typeof tema === "string"
                        ? tema
                        : tema?.nombre || ""
                ).filter(Boolean).length > 0
                    ? curso.temas.map((tema) =>
                        typeof tema === "string"
                            ? tema
                            : tema?.nombre || ""
                    ).filter(Boolean)
                    : [""]
                : [""],

            tareas: Array.isArray(curso.tareas)
                ? curso.tareas.map((tarea) => ({
                    nombre:
                        typeof tarea === "string"
                            ? tarea
                            : tarea?.nombre || "",
                    descripcion:
                        typeof tarea === "string"
                            ? ""
                            : tarea?.descripcion || ""
                })).filter((tarea) =>
                    tarea.nombre || tarea.descripcion
                ).length > 0
                    ? curso.tareas.map((tarea) => ({
                        nombre:
                            typeof tarea === "string"
                                ? tarea
                                : tarea?.nombre || "",
                        descripcion:
                            typeof tarea === "string"
                                ? ""
                                : tarea?.descripcion || ""
                    })).filter((tarea) =>
                        tarea.nombre || tarea.descripcion
                    )
                    : [{ nombre: "", descripcion: "" }]
                : [{ nombre: "", descripcion: "" }]
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
            `${t("confirmarEliminarCurso")} "${obtenerNombreCurso(curso)}"?`
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
                t("cursoEliminado")
            );
        } catch (error) {
            console.error(error);

            setError(
                t("errorEliminarCurso")
            );
        }
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
                    {t("volverPanel")}
                </button>

                <header className="cursos-admin-header">

                    <div>
                        <span className="cursos-admin-eyebrow">
                            {t("administracion").toUpperCase()}
                        </span>

                        <h1>
                            {t("gestionCursos")}
                        </h1>

                        <p>
                            {t("gestionCursosDescripcion")}
                        </p>
                    </div>

                    <div className="cursos-header-actions">

                        <button
                            type="button"
                            className="add-course-button"
                            onClick={abrirFormulario}
                        >
                            <span>+</span>
                            {t("agregarCurso")}
                        </button>

                        <div className="cursos-total">
                            <span>{t("cursos").toUpperCase()}</span>

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
                                        ? t("editarCurso").toUpperCase()
                                        : t("nuevoCurso").toUpperCase()}
                                </span>

                                <h2>
                                    {cursoEditando
                                        ? t("editarCurso")
                                    : t("agregarCurso")}
                                </h2>
                            </div>

                            <button
                                type="button"
                                className="close-form-button"
                                onClick={cerrarFormulario}
                            >
                                {t("cerrar")}
                            </button>

                        </div>

                        <form
                            className="curso-form"
                            onSubmit={manejarSubmit}
                        >

                            <div className="form-grid">

                                <div className="form-group">
                                    <label htmlFor="nombre">
                                        {t("nombreCurso")}
                                    </label>

                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                        placeholder={t("ejemploPython")}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="categoria">
                                        {t("categoria")}
                                    </label>

                                    <input
                                        id="categoria"
                                        name="categoria"
                                        type="text"
                                        value={formulario.categoria}
                                        onChange={manejarCambio}
                                        placeholder={t("ejemploProgramacion")}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="profesor">
                                        {t("profesor")}
                                    </label>

                                    <input
                                        id="profesor"
                                        name="profesor"
                                        type="text"
                                        value={formulario.profesor}
                                        onChange={manejarCambio}
                                        placeholder={t("nombreProfesor")}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="duracion">
                                        {t("duracion")}
                                    </label>

                                    <input
                                        id="duracion"
                                        name="duracion"
                                        type="text"
                                        value={formulario.duracion}
                                        onChange={manejarCambio}
                                        placeholder={t("ejemploSemanas")}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="modalidad">
                                        {t("modalidad")}
                                    </label>

                                    <select
                                        id="modalidad"
                                        name="modalidad"
                                        value={formulario.modalidad}
                                        onChange={manejarCambio}
                                    >
                                        <option value="Virtual">
                                            {t("modalidadVirtual")}
                                        </option>

                                        <option value="Presencial">
                                            {t("modalidadPresencial")}
                                        </option>

                                        <option value="Híbrida">
                                            {t("modalidadHibrida")}
                                        </option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="precio">
                                        {t("precio")}
                                    </label>

                                    <div className="price-input">
                                        <span>₡</span>

                                        <input
                                            id="precio"
                                            name="precio"
                                            type="number"
                                            min="1"
                                            step="1"
                                            value={formulario.precio}
                                            onChange={manejarCambio}
                                            placeholder="45000"
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="form-group full-width">

                                <label htmlFor="areas">
                                    {t("areasInteres")}
                                </label>

                                <input
                                    id="areas"
                                    name="areas"
                                    type="text"
                                    value={formulario.areas}
                                    onChange={manejarCambio}
                                    placeholder={t("programacionLogica")}
                                />

                                <small>
                                    {t("areasAyuda")}
                                </small>

                            </div>

                            <div className="form-group full-width">

                                <label htmlFor="descripcion">
                                    {t("descripcionCurso")}
                                </label>

                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formulario.descripcion}
                                    onChange={manejarCambio}
                                    placeholder={t("descripcionCursoPlaceholder")}
                                    rows="4"
                                />

                            </div>

                            <div className="dynamic-form-grid">

                                <div className="form-group dynamic-list-group">

                                    <div className="dynamic-list-header">
                                        <div>
                                            <label>
                                                {t("temasCurso")}
                                            </label>
                                            <small>
                                                {t("unTemaPorLinea")}
                                            </small>
                                        </div>

                                        <button
                                            type="button"
                                            className="add-item-button"
                                            onClick={agregarTema}
                                        >
                                            + {t("agregarTema")}
                                        </button>
                                    </div>

                                    <div className="dynamic-items">
                                        {formulario.temas.map((tema, index) => (
                                            <div
                                                className="dynamic-item-row"
                                                key={`tema-${index}`}
                                            >
                                                <span className="dynamic-item-number">
                                                    {index + 1}
                                                </span>

                                                <input
                                                    type="text"
                                                    value={tema}
                                                    onChange={(event) =>
                                                        cambiarTema(
                                                            index,
                                                            event.target.value
                                                        )
                                                    }
                                                    placeholder={`${t("temaPlaceholder")} ${index + 1}`}
                                                />

                                                <button
                                                    type="button"
                                                    className="remove-item-button"
                                                    onClick={() => eliminarTema(index)}
                                                    aria-label={`${t("eliminarTema")} ${index + 1}`}
                                                    title={t("eliminarTema")}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <div className="form-group dynamic-list-group">

                                    <div className="dynamic-list-header">
                                        <div>
                                            <label>
                                                {t("tareasCurso")}
                                            </label>
                                            <small>
                                                {t("unaTareaPorLinea")}
                                            </small>
                                        </div>

                                        <button
                                            type="button"
                                            className="add-item-button"
                                            onClick={agregarTarea}
                                        >
                                            + {t("agregarTarea")}
                                        </button>
                                    </div>

                                    <div className="dynamic-items">
                                        {formulario.tareas.map((tarea, index) => (
                                            <div
                                                className="dynamic-task-card"
                                                key={`tarea-${index}`}
                                            >
                                                <div className="dynamic-task-card-header">
                                                    <span className="dynamic-item-number">
                                                        {index + 1}
                                                    </span>

                                                    <strong>
                                                        {t("tareaNumero")} {index + 1}
                                                    </strong>

                                                    <button
                                                        type="button"
                                                        className="remove-item-button"
                                                        onClick={() => eliminarTarea(index)}
                                                        aria-label={`${t("eliminarTarea")} ${index + 1}`}
                                                        title={t("eliminarTarea")}
                                                    >
                                                        ×
                                                    </button>
                                                </div>

                                                <input
                                                    type="text"
                                                    value={tarea.nombre}
                                                    onChange={(event) =>
                                                        cambiarTarea(
                                                            index,
                                                            "nombre",
                                                            event.target.value
                                                        )
                                                    }
                                                    placeholder={t("nombreTareaPlaceholder")}
                                                />

                                                <textarea
                                                    value={tarea.descripcion}
                                                    onChange={(event) =>
                                                        cambiarTarea(
                                                            index,
                                                            "descripcion",
                                                            event.target.value
                                                        )
                                                    }
                                                    placeholder={t("descripcionTareaPlaceholder")}
                                                    rows="3"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>

                            <div className="form-footer">

                                <p>
                                    {t("camposCursoJson")}
                                </p>

                                <div className="form-actions">

                                    <button
                                        type="button"
                                        className="cancel-form-button"
                                        onClick={cerrarFormulario}
                                    >
                                        {t("cancelar")}
                                    </button>

                                    <button
                                        type="submit"
                                        className="save-course-button"
                                        disabled={guardando}
                                    >
                                        {guardando
                                            ? t("traduciendoGuardando")
                                            : cursoEditando
                                                ? t("guardarCambios")
                                                : t("crearCurso")}
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
                                {t("cursosRegistrados").toUpperCase()}
                            </span>

                            <h2>
                                {t("cursosLearnix")}
                            </h2>

                            <p>
                                {t("administrarCursosDescripcion")}
                            </p>
                        </div>

                        <span className="courses-count">
                            {cursos.length}
                        </span>

                    </div>

                    {cargando ? (
                        <div className="courses-loading">
                            {t("cargandoCursosAdmin")}
                        </div>
                    ) : cursos.length === 0 ? (
                        <div className="courses-empty">
                            {t("noCursosRegistrados")}
                        </div>
                    ) : (
                        <div className="courses-table-wrapper">

                            <table className="courses-table">

                                <thead>
                                    <tr>
                                        <th>{t("curso")}</th>
                                        <th>{t("categoria")}</th>
                                        <th>{t("profesor")}</th>
                                        <th>{t("precio")}</th>
                                        <th>{t("acciones")}</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {cursos.map((curso) => (
                                        <tr key={curso.id}>

                                            <td>
                                                <div className="course-name">
                                                    {obtenerNombreCurso(curso)}
                                                </div>
                                            </td>

                                            <td>
                                                <span className="course-category">
                                                    {obtenerCategoriaCurso(curso)}
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
                                                        {t("editarCurso")}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="delete-button"
                                                        onClick={() =>
                                                            manejarEliminar(curso)
                                                        }
                                                    >
                                                        {t("eliminar")}
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