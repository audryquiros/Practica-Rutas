import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useCurrency } from "../../context/CurrencyContext";
import DatePicker from "../../components/DatePicker";
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
    activa: true,
    descripcion: ""
};

function Promociones() {
    const navigate = useNavigate();
    const { idioma, t } = useLanguage();
    const { moneda, formatearPrecio } = useCurrency();

    const idiomaIngles = idioma === "en";

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
                t("errorCargarPromociones")
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
                t("camposPromocionObligatorios")
            );

            return false;
        }

        if (Number(formulario.valor) <= 0) {
            setError(
                t("valorPromocionMayorCero")
            );

            return false;
        }

        if (
            formulario.tipo === "porcentaje" &&
            Number(formulario.valor) > 100
        ) {
            setError(
                t("porcentajeMaximo")
            );

            return false;
        }

        if (
            formulario.fechaFin <
            formulario.fechaInicio
        ) {
            setError(
                t("fechaFinalPosterior")
            );

            return false;
        }

        return true;
    };

    const traducirPromocion = async (promocion) => {
        const response = await fetch("http://localhost:3002/api/traducir-promocion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ promocion })
        });

        if (!response.ok) {
            throw new Error("No se pudo traducir la promoción automáticamente.");
        }

        return await response.json();
    };

    const prepararPromocion = () => {
        return {
            cursoId: String(formulario.cursoId),
            tipo: formulario.tipo,
            valor: Number(formulario.valor),
            fechaInicio: formulario.fechaInicio,
            fechaFin: formulario.fechaFin,
            activa: formulario.activa,
            descripcion: formulario.descripcion.trim()
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

            const traduccion = await traducirPromocion(promocion);

            const promocionConTraduccion = {
                ...promocion,
                ...traduccion
            };

            if (promocionEditando) {
                await actualizarPromocion(
                    promocionEditando.id,
                    promocionConTraduccion
                );

                setMensaje(
                    t("promocionActualizada")
                );
            } else {
                await crearPromocion(promocionConTraduccion);

                setMensaje(
                    t("promocionCreada")
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
                    ? t("errorActualizarPromocion")
                    : t("errorCrearPromocion")
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
                    : true,
            descripcion: promocion.descripcion || ""
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
            `${t("confirmarEliminarPromocion")} "${nombreCurso}"?`
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
                t("promocionEliminada")
            );
        } catch (error) {
            console.error(error);

            setError(
                t("errorEliminarPromocion")
            );
        }
    };

    const obtenerNombreCurso = (cursoId) => {
        const curso = cursos.find(
            (item) =>
                String(item.id) === String(cursoId)
        );

        return idiomaIngles && curso?.nombre_en
            ? curso.nombre_en
            : curso?.nombre || t("cursoNoEncontrado");
    };

    const obtenerEstadoPromocion = (promocion) => {
        if (!promocion.activa) {
            return "inactiva";
        }

        const hoy = new Date()
            .toISOString()
            .split("T")[0];

        if (promocion.fechaInicio > hoy) {
            return "programada";
        }

        if (promocion.fechaFin < hoy) {
            return "finalizada";
        }

        return "activa";
    };

    const formatearDescuento = (promocion) => {
        if (promocion.tipo === "porcentaje") {
            return `${promocion.valor}%`;
        }

        return formatearPrecio(promocion.valor);
    };

    const promocionesActivas = promociones.filter(
        (promocion) =>
            obtenerEstadoPromocion(promocion) ===
            "activa"
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
                    {t("volverPanel")}
                </button>

                {/* =========================
                    HEADER
                ========================= */}

                <header className="promociones-header">

                    <div>
                        <span className="promociones-eyebrow">
                            {t("administracion").toUpperCase()}
                        </span>

                        <h1>
                            {t("gestionPromociones")}
                        </h1>

                        <p>
                            {t("gestionPromocionesDescripcion")}
                        </p>
                    </div>

                    <div className="promociones-header-actions">

                        <button
                            type="button"
                            className="add-promotion-button"
                            onClick={abrirFormulario}
                        >
                            <span>+</span>
                            {t("agregarPromocion")}
                        </button>

                        <div className="promociones-total">
                            <span>{t("activas").toUpperCase()}</span>

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
                                        ? t("editarPromocion").toUpperCase()
                                        : t("nuevaPromocion").toUpperCase()}
                                </span>

                                <h2>
                                    {promocionEditando
                                        ? t("editarPromocion")
                                        : t("agregarPromocion")}
                                </h2>
                            </div>

                            <button
                                type="button"
                                className="close-promotion-button"
                                onClick={cerrarFormulario}
                            >
                                {t("cerrar")}
                            </button>

                        </div>

                        <form
                            className="promocion-form"
                            onSubmit={manejarSubmit}
                        >

                            <div className="promotion-form-grid">

                                <div className="promotion-form-group">
                                    <label htmlFor="cursoId">
                                        {t("curso")}
                                    </label>

                                    <select
                                        id="cursoId"
                                        name="cursoId"
                                        value={formulario.cursoId}
                                        onChange={manejarCambio}
                                    >
                                        <option value="">
                                            {t("seleccionarCurso")}
                                        </option>

                                        {cursos.map((curso) => (
                                            <option
                                                key={curso.id}
                                                value={curso.id}
                                            >
                                                {idiomaIngles && curso.nombre_en ? curso.nombre_en : curso.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="promotion-form-group">
                                    <label htmlFor="tipo">
                                        {t("tipoDescuento")}
                                    </label>

                                    <select
                                        id="tipo"
                                        name="tipo"
                                        value={formulario.tipo}
                                        onChange={manejarCambio}
                                    >
                                        <option value="porcentaje">
                                            {t("porcentaje")}
                                        </option>

                                        <option value="monto">
                                            {t("montoFijo")}
                                        </option>
                                    </select>
                                </div>

                                <div className="promotion-form-group">
                                    <label htmlFor="valor">
                                        {formulario.tipo === "porcentaje"
                                            ? t("porcentajeDescuento")
                                            : t("montoDescuento")}
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
                                                    : "Ej. 20.00"
                                            }
                                        />

                                        <span>
                                            {formulario.tipo ===
                                            "porcentaje"
                                                ? "%"
                                                : moneda === "CRC" ? "₡" : "$"}
                                        </span>

                                    </div>
                                </div>

                                <div className="promotion-form-group">
                                    <label htmlFor="fechaInicio">
                                        {t("fechaInicio")}
                                    </label>

                                    <DatePicker
                                        id="fechaInicio"
                                        name="fechaInicio"
                                        label={t("fechaInicio")}
                                        value={formulario.fechaInicio}
                                        onChange={manejarCambio}
                                    />
                                </div>

                                <div className="promotion-form-group">
                                    <label htmlFor="fechaFin">
                                        {t("fechaFin")}
                                    </label>

                                    <DatePicker
                                        id="fechaFin"
                                        name="fechaFin"
                                        label={t("fechaFin")}
                                        value={formulario.fechaFin}
                                        onChange={manejarCambio}
                                    />
                                </div>

                            </div>

                            <div className="promotion-form-group promotion-description-group">
                                <label htmlFor="descripcion">
                                    {t("descripcionPromocion")}
                                </label>

                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formulario.descripcion}
                                    onChange={manejarCambio}
                                    placeholder={t("descripcionPromocionPlaceholder")}
                                    rows="3"
                                />
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
                                    {t("promocionActiva")}
                                </span>

                            </label>

                            <div className="promotion-form-footer">

                                <p>
                                    {t("promocionAplicadaFechas")}
                                </p>

                                <div className="promotion-form-actions">

                                    <button
                                        type="button"
                                        className="cancel-promotion-button"
                                        onClick={cerrarFormulario}
                                    >
                                        {t("cancelar")}
                                    </button>

                                    <button
                                        type="submit"
                                        className="save-promotion-button"
                                        disabled={guardando}
                                    >
                                        {guardando
                                            ? t("traduciendoGuardando")
                                            : promocionEditando
                                                ? t("guardarCambios")
                                                : t("agregarPromocion")}
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
                                {t("promocionesRegistradas").toUpperCase()}
                            </span>

                            <h2>
                                {t("promocionesLearnix")}
                            </h2>

                            <p>
                                {t("administrarDescuentos")}
                            </p>
                        </div>

                        <span className="promotions-count">
                            {promociones.length}
                        </span>

                    </div>

                    {cargando ? (
                        <div className="promotions-loading">
                            {t("cargandoPromociones")}
                        </div>
                    ) : promociones.length === 0 ? (
                        <div className="promotions-empty">

                            <strong>
                                {t("noPromocionesRegistradas")}
                            </strong>

                            <p>
                                {t("utilizaAgregarPromocion")}
                            </p>

                        </div>
                    ) : (
                        <div className="promotions-table-wrapper">

                            <table className="promotions-table">

                                <thead>
                                    <tr>
                                        <th>{t("curso")}</th>
                                        <th>{t("descuentoTabla")}</th>
                                        <th>{t("inicioPromocion")}</th>
                                        <th>{t("finalizacion")}</th>
                                        <th>{t("estado")}</th>
                                        <th>{t("acciones")}</th>
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

                                                        {promocion.descripcion && (
                                                            <div className="promotion-description-preview">
                                                                {idiomaIngles && promocion.descripcion_en
                                                                    ? promocion.descripcion_en
                                                                    : promocion.descripcion}
                                                            </div>
                                                        )}
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
                                                            className={`promotion-status ${estado}`}
                                                        >
                                                            {t(`estado${estado.charAt(0).toUpperCase()}${estado.slice(1)}`)}
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
                                                                {t("editarPromocion")}
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
                                                                {t("eliminar")}
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