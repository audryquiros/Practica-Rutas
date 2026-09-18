import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    obtenerPromociones,
    crearPromocion,
    actualizarPromocion,
    eliminarPromocion
} from "../../services/promocionesService";
import { obtenerCursos } from "../../services/cursosService";
import "./Promociones.css";

const formularioInicial = {
    cursoId: "",
    tipo: "porcentaje",
    valor: "",
    fechaInicio: "",
    fechaFin: "",
    activa: true
};

function Promociones() {
    const navigate = useNavigate();

    const [promociones, setPromociones] = useState([]);
    const [cursos, setCursos] = useState([]);

    const [formulario, setFormulario] = useState(
        formularioInicial
    );

    const [promocionEditando, setPromocionEditando] =
        useState(null);

    const [formularioAbierto, setFormularioAbierto] =
        useState(false);

    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            setError("");

            const [promocionesData, cursosData] =
                await Promise.all([
                    obtenerPromociones(),
                    obtenerCursos()
                ]);

            setPromociones(promocionesData);
            setCursos(cursosData);
        } catch (error) {
            console.error(error);

            setError(
                "No se pudieron cargar las promociones."
            );
        } finally {
            setCargando(false);
        }
    };

    const manejarCambio = (event) => {
        const { name, value, type, checked } = event.target;

        setFormulario((actual) => ({
            ...actual,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const abrirFormulario = () => {
        setFormularioAbierto(true);
        setPromocionEditando(null);
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
        setPromocionEditando(null);
        setFormulario(formularioInicial);

        setError("");
        setMensaje("");
    };

    const validarFormulario = () => {
        if (
            !formulario.cursoId ||
            !formulario.valor ||
            !formulario.fechaInicio ||
            !formulario.fechaFin
        ) {
            setError(
                "Completa todos los campos obligatorios."
            );

            return false;
        }

        if (Number(formulario.valor) <= 0) {
            setError(
                "El valor de la promoción debe ser mayor que cero."
            );

            return false;
        }

        if (
            formulario.tipo === "porcentaje" &&
            Number(formulario.valor) > 100
        ) {
            setError(
                "El porcentaje no puede ser mayor a 100%."
            );

            return false;
        }

        if (
            formulario.fechaFin <
            formulario.fechaInicio
        ) {
            setError(
                "La fecha de finalización debe ser posterior a la fecha de inicio."
            );

            return false;
        }

        return true;
    };

    const prepararPromocion = () => {
        return {
            cursoId: String(formulario.cursoId),
            tipo: formulario.tipo,
            valor: Number(formulario.valor),
            fechaInicio: formulario.fechaInicio,
            fechaFin: formulario.fechaFin,
            activa: formulario.activa
        };
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

            const promocion = prepararPromocion();

            if (promocionEditando) {
                await actualizarPromocion(
                    promocionEditando.id,
                    promocion
                );

                setMensaje(
                    "La promoción se actualizó correctamente."
                );
            } else {
                await crearPromocion(promocion);

                setMensaje(
                    "La promoción se creó correctamente."
                );
            }

            setFormulario(formularioInicial);
            setPromocionEditando(null);

            await cargarDatos();

            setFormularioAbierto(false);

        } catch (error) {
            console.error(error);

            setError(
                promocionEditando
                    ? "No se pudo actualizar la promoción."
                    : "No se pudo crear la promoción."
            );
        } finally {
            setGuardando(false);
        }
    };

    const manejarEditar = (promocion) => {
        setPromocionEditando(promocion);
        setFormularioAbierto(true);

        setFormulario({
            cursoId: promocion.cursoId || "",
            tipo: promocion.tipo || "porcentaje",
            valor: promocion.valor || "",
            fechaInicio: promocion.fechaInicio || "",
            fechaFin: promocion.fechaFin || "",
            activa:
                promocion.activa !== undefined
                    ? promocion.activa
                    : true
        });

        setError("");
        setMensaje("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const manejarEliminar = async (promocion) => {
        const nombreCurso = obtenerNombreCurso(
            promocion.cursoId
        );

        const confirmar = window.confirm(
            `¿Seguro que deseas eliminar la promoción de "${nombreCurso}"?`
        );

        if (!confirmar) {
            return;
        }

        try {
            setError("");
            setMensaje("");

            await eliminarPromocion(promocion.id);

            setPromociones((actuales) =>
                actuales.filter(
                    (item) => item.id !== promocion.id
                )
            );

            if (
                promocionEditando?.id === promocion.id
            ) {
                cerrarFormulario();
            }

            setMensaje(
                "La promoción se eliminó correctamente."
            );
        } catch (error) {
            console.error(error);

            setError(
                "No se pudo eliminar la promoción."
            );
        }
    };

    const obtenerNombreCurso = (cursoId) => {
        const curso = cursos.find(
            (item) =>
                String(item.id) === String(cursoId)
        );

        return curso?.nombre || "Curso no encontrado";
    };

    const obtenerEstadoPromocion = (promocion) => {
        if (!promocion.activa) {
            return "Inactiva";
        }

        const hoy = new Date()
            .toISOString()
            .split("T")[0];

        if (promocion.fechaInicio > hoy) {
            return "Programada";
        }

        if (promocion.fechaFin < hoy) {
            return "Finalizada";
        }

        return "Activa";
    };

    const formatearDescuento = (promocion) => {
        if (promocion.tipo === "porcentaje") {
            return `${promocion.valor}%`;
        }

        return new Intl.NumberFormat("es-CR", {
            style: "currency",
            currency: "CRC",
            maximumFractionDigits: 0
        }).format(Number(promocion.valor) || 0);
    };

    const promocionesActivas = promociones.filter(
        (promocion) =>
            obtenerEstadoPromocion(promocion) ===
            "Activa"
    );

    return (
        <main className="promociones-page">

            <div className="promociones-container">

                {/* =========================
                    VOLVER
                ========================= */}

                <button
                    type="button"
                    className="promociones-back-button"
                    onClick={() => navigate("/admin")}
                >
                    <span>←</span>
                    Volver al panel
                </button>

                {/* =========================
                    HEADER
                ========================= */}

                <header className="promociones-header">

                    <div>
                        <span className="promociones-eyebrow">
                            ADMINISTRACIÓN
                        </span>

                        <h1>
                            Gestión de promociones
                        </h1>

                        <p>
                            Crea descuentos y administra las
                            promociones de los cursos de Learnix.
                        </p>
                    </div>

                    <div className="promociones-header-actions">

                        <button
                            type="button"
                            className="add-promotion-button"
                            onClick={abrirFormulario}
                        >
                            <span>+</span>
                            Agregar promoción
                        </button>

                        <div className="promociones-total">
                            <span>ACTIVAS</span>

                            <strong>
                                {promocionesActivas.length}
                            </strong>
                        </div>

                    </div>

                </header>

                {/* =========================
                    MENSAJES
                ========================= */}

                {error && (
                    <div className="promociones-message error">
                        {error}
                    </div>
                )}

                {mensaje && (
                    <div className="promociones-message success">
                        {mensaje}
                    </div>
                )}

                {/* =========================
                    FORMULARIO
                ========================= */}

                {formularioAbierto && (
                    <section className="promocion-form-section">

                        <div className="promocion-section-heading">

                            <div>
                                <span className="section-number">
                                    {promocionEditando
                                        ? "EDITAR PROMOCIÓN"
                                        : "NUEVA PROMOCIÓN"}
                                </span>

                                <h2>
                                    {promocionEditando
                                        ? "Editar promoción"
                                        : "Agregar promoción"}
                                </h2>
                            </div>

                            <button
                                type="button"
                                className="close-promotion-button"
                                onClick={cerrarFormulario}
                            >
                                Cerrar
                            </button>

                        </div>

                        <form
                            className="promocion-form"
                            onSubmit={manejarSubmit}
                        >

                            <div className="promotion-form-grid">

                                <div className="promotion-form-group">
                                    <label htmlFor="cursoId">
                                        Curso
                                    </label>

                                    <select
                                        id="cursoId"
                                        name="cursoId"
                                        value={formulario.cursoId}
                                        onChange={manejarCambio}
                                    >
                                        <option value="">
                                            Selecciona un curso
                                        </option>

                                        {cursos.map((curso) => (
                                            <option
                                                key={curso.id}
                                                value={curso.id}
                                            >
                                                {curso.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="promotion-form-group">
                                    <label htmlFor="tipo">
                                        Tipo de descuento
                                    </label>

                                    <select
                                        id="tipo"
                                        name="tipo"
                                        value={formulario.tipo}
                                        onChange={manejarCambio}
                                    >
                                        <option value="porcentaje">
                                            Porcentaje
                                        </option>

                                        <option value="monto">
                                            Monto fijo
                                        </option>
                                    </select>
                                </div>

                                <div className="promotion-form-group">
                                    <label htmlFor="valor">
                                        {formulario.tipo === "porcentaje"
                                            ? "Porcentaje de descuento"
                                            : "Monto de descuento"}
                                    </label>

                                    <div className="promotion-value-input">

                                        <input
                                            id="valor"
                                            name="valor"
                                            type="number"
                                            min="1"
                                            max={
                                                formulario.tipo ===
                                                "porcentaje"
                                                    ? "100"
                                                    : undefined
                                            }
                                            value={formulario.valor}
                                            onChange={manejarCambio}
                                            placeholder={
                                                formulario.tipo ===
                                                "porcentaje"
                                                    ? "Ej. 20"
                                                    : "Ej. 5000"
                                            }
                                        />

                                        <span>
                                            {formulario.tipo ===
                                            "porcentaje"
                                                ? "%"
                                                : "₡"}
                                        </span>

                                    </div>
                                </div>

                                <div className="promotion-form-group">
                                    <label htmlFor="fechaInicio">
                                        Fecha de inicio
                                    </label>

                                    <input
                                        id="fechaInicio"
                                        name="fechaInicio"
                                        type="date"
                                        value={
                                            formulario.fechaInicio
                                        }
                                        onChange={manejarCambio}
                                    />
                                </div>

                                <div className="promotion-form-group">
                                    <label htmlFor="fechaFin">
                                        Fecha de finalización
                                    </label>

                                    <input
                                        id="fechaFin"
                                        name="fechaFin"
                                        type="date"
                                        value={
                                            formulario.fechaFin
                                        }
                                        onChange={manejarCambio}
                                    />
                                </div>

                            </div>

                            <label className="promotion-checkbox">

                                <input
                                    type="checkbox"
                                    name="activa"
                                    checked={formulario.activa}
                                    onChange={manejarCambio}
                                />

                                <span className="checkbox-custom"></span>

                                <span>
                                    Promoción activa
                                </span>

                            </label>

                            <div className="promotion-form-footer">

                                <p>
                                    La promoción se aplicará al
                                    curso seleccionado durante
                                    las fechas indicadas.
                                </p>

                                <div className="promotion-form-actions">

                                    <button
                                        type="button"
                                        className="cancel-promotion-button"
                                        onClick={cerrarFormulario}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="save-promotion-button"
                                        disabled={guardando}
                                    >
                                        {guardando
                                            ? "Guardando..."
                                            : promocionEditando
                                                ? "Guardar cambios"
                                                : "Crear promoción"}
                                    </button>

                                </div>

                            </div>

                        </form>

                    </section>
                )}

                {/* =========================
                    LISTA
                ========================= */}

                <section className="promotions-list-section">

                    <div className="promotions-list-header">

                        <div>
                            <span className="section-number">
                                PROMOCIONES REGISTRADAS
                            </span>

                            <h2>
                                Promociones de Learnix
                            </h2>

                            <p>
                                Administra los descuentos disponibles
                                para los cursos.
                            </p>
                        </div>

                        <span className="promotions-count">
                            {promociones.length}
                        </span>

                    </div>

                    {cargando ? (
                        <div className="promotions-loading">
                            Cargando promociones...
                        </div>
                    ) : promociones.length === 0 ? (
                        <div className="promotions-empty">

                            <strong>
                                No hay promociones registradas.
                            </strong>

                            <p>
                                Utiliza el botón "Agregar promoción"
                                para crear la primera.
                            </p>

                        </div>
                    ) : (
                        <div className="promotions-table-wrapper">

                            <table className="promotions-table">

                                <thead>
                                    <tr>
                                        <th>Curso</th>
                                        <th>Descuento</th>
                                        <th>Inicio</th>
                                        <th>Finalización</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {promociones.map(
                                        (promocion) => {

                                            const estado =
                                                obtenerEstadoPromocion(
                                                    promocion
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        promocion.id
                                                    }
                                                >

                                                    <td>
                                                        <div className="promotion-course-name">
                                                            {obtenerNombreCurso(
                                                                promocion.cursoId
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <span className="promotion-discount">
                                                            {formatearDescuento(
                                                                promocion
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {
                                                            promocion.fechaInicio
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            promocion.fechaFin
                                                        }
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`promotion-status ${estado
                                                                .toLowerCase()
                                                                .replace(
                                                                    "í",
                                                                    "i"
                                                                )}`}
                                                        >
                                                            {estado}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <div className="promotion-actions">

                                                            <button
                                                                type="button"
                                                                className="edit-promotion-button"
                                                                onClick={() =>
                                                                    manejarEditar(
                                                                        promocion
                                                                    )
                                                                }
                                                            >
                                                                Editar
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="delete-promotion-button"
                                                                onClick={() =>
                                                                    manejarEliminar(
                                                                        promocion
                                                                    )
                                                                }
                                                            >
                                                                Eliminar
                                                            </button>

                                                        </div>
                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </section>

            </div>

        </main>
    );
}

export default Promociones;