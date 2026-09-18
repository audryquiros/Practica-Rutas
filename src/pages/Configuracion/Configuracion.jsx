import { useTheme } from "../../context/ThemeContext";

import "./Configuracion.css";

function Configuracion() {
    const {
        preferencias,
        cambiarPreferencia,
        restablecerPreferencias,
        t
    } = useTheme();

    const tamanios = [
        {
            valor: "muy-pequena",
            escala: 0.85
        },
        {
            valor: "pequena",
            escala: 0.92
        },
        {
            valor: "normal",
            escala: 1
        },
        {
            valor: "grande",
            escala: 1.10
        },
        {
            valor: "muy-grande",
            escala: 1.20
        }
    ];

    const tamanioActual =
        tamanios.find(
            (item) =>
                item.valor === preferencias.tamanioLetra
        ) || tamanios[2];

    const cambiarTamanio = (event) => {
        const indice = Number(event.target.value);

        cambiarPreferencia(
            "tamanioLetra",
            tamanios[indice].valor
        );
    };

    const indiceActual = Math.max(
        0,
        tamanios.findIndex(
            (item) =>
                item.valor === preferencias.tamanioLetra
        )
    );

    return (
        <main className="configuracion-page">

            <div className="configuracion-container">

                <section className="configuracion-header">

                    <span className="configuracion-label">
                        {t("configuracion").toUpperCase()}
                    </span>

                    <h1>
                        {t("preferencias")}
                    </h1>

                    <p>
                        {t("personalizaLearnix")}
                    </p>

                </section>


                <section className="configuracion-card">

                    {/* IDIOMA */}

                    <div className="configuracion-section">

                        <div className="configuracion-section-header">

                            <span className="configuracion-section-label">
                                {t("idioma")}
                            </span>

                            <h2>
                                {t("idiomaPlataforma")}
                            </h2>

                            <p>
                                {t("seleccionaIdioma")}
                            </p>

                        </div>

                        <div className="configuracion-options-grid">

                            <button
                                type="button"
                                className={
                                    preferencias.idioma === "es"
                                        ? "configuracion-choice active"
                                        : "configuracion-choice"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "idioma",
                                        "es"
                                    )
                                }
                            >
                                <strong>
                                    {t("espanol")}
                                </strong>

                                <span>
                                    ES
                                </span>
                            </button>


                            <button
                                type="button"
                                className={
                                    preferencias.idioma === "en"
                                        ? "configuracion-choice active"
                                        : "configuracion-choice"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "idioma",
                                        "en"
                                    )
                                }
                            >
                                <strong>
                                    {t("ingles")}
                                </strong>

                                <span>
                                    EN
                                </span>
                            </button>

                        </div>

                    </div>


                    <div className="configuracion-divider"></div>


                    {/* TEMA */}

                    <div className="configuracion-section">

                        <div className="configuracion-section-header">

                            <span className="configuracion-section-label">
                                {t("apariencia")}
                            </span>

                            <h2>
                                {t("tema")}
                            </h2>

                            <p>
                                {t("cambiaColores")}
                            </p>

                        </div>


                        <div className="configuracion-theme-grid">

                            <button
                                type="button"
                                className={
                                    preferencias.tema === "claro"
                                        ? "configuracion-theme active"
                                        : "configuracion-theme"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "tema",
                                        "claro"
                                    )
                                }
                            >
                                <span className="theme-preview theme-light"></span>

                                <div>
                                    <strong>
                                        {t("claro")}
                                    </strong>

                                    <span>
                                        {t("interfazClara")}
                                    </span>
                                </div>
                            </button>


                            <button
                                type="button"
                                className={
                                    preferencias.tema === "oscuro"
                                        ? "configuracion-theme active"
                                        : "configuracion-theme"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "tema",
                                        "oscuro"
                                    )
                                }
                            >
                                <span className="theme-preview theme-dark"></span>

                                <div>
                                    <strong>
                                        {t("oscuro")}
                                    </strong>

                                    <span>
                                        {t("menorLuminosidad")}
                                    </span>
                                </div>
                            </button>


                            <button
                                type="button"
                                className={
                                    preferencias.tema === "lavanda"
                                        ? "configuracion-theme active"
                                        : "configuracion-theme"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "tema",
                                        "lavanda"
                                    )
                                }
                            >
                                <span className="theme-preview theme-lavender"></span>

                                <div>
                                    <strong>
                                        {t("lavanda")}
                                    </strong>

                                    <span>
                                        {t("tonosSuaves")}
                                    </span>
                                </div>
                            </button>


                            <button
                                type="button"
                                className={
                                    preferencias.tema === "azul"
                                        ? "configuracion-theme active"
                                        : "configuracion-theme"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "tema",
                                        "azul"
                                    )
                                }
                            >
                                <span className="theme-preview theme-blue"></span>

                                <div>
                                    <strong>
                                        {t("azul")}
                                    </strong>

                                    <span>
                                        {t("tonosFrios")}
                                    </span>
                                </div>
                            </button>

                        </div>

                    </div>


                    <div className="configuracion-divider"></div>


                    {/* TAMAÑO DE LETRA */}

                    <div className="configuracion-section">

                        <div className="configuracion-section-header">

                            <span className="configuracion-section-label">
                                {t("accesibilidad")}
                            </span>

                            <h2>
                                {t("tamanoLetra")}
                            </h2>

                            <p>
                                {t("ajustaTamano")}
                            </p>

                        </div>


                        <div className="font-size-control">

                            <div className="font-size-scale">

                                <span className="font-size-a font-size-a-small">
                                    A
                                </span>


                                <div className="font-size-track">

                                    <input
                                        type="range"
                                        min="0"
                                        max="4"
                                        step="1"
                                        value={indiceActual}
                                        onChange={cambiarTamanio}
                                        className="font-size-slider"
                                        aria-label={t("tamanoLetra")}
                                    />

                                    <div className="font-size-points">
                                        {tamanios.map((item) => (
                                            <span
                                                key={item.valor}
                                                className={
                                                    preferencias.tamanioLetra === item.valor
                                                        ? "active"
                                                        : ""
                                                }
                                            ></span>
                                        ))}
                                    </div>

                                </div>


                                <span className="font-size-a font-size-a-large">
                                    A
                                </span>

                            </div>


                            <div className="font-size-labels">

                                {tamanios.map(
                                    (item) => (
                                        <span
                                            key={item.valor}
                                            className={
                                                preferencias.tamanioLetra ===
                                                item.valor
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            {t(item.valor)}
                                        </span>
                                    )
                                )}

                            </div>


                            <div className="font-size-current">

                                <span>
                                    {t("tamanoActual")}:
                                </span>

                                <strong>
                                    {t(tamanioActual.valor)}
                                </strong>

                            </div>

                        </div>

                    </div>


                    <div className="configuracion-divider"></div>


                    {/* FUENTE */}

                    <div className="configuracion-section">

                        <div className="configuracion-section-header">

                            <span className="configuracion-section-label">
                                {t("tipografia")}
                            </span>

                            <h2>
                                {t("fuente")}
                            </h2>

                            <p>
                                {t("seleccionaFuente")}
                            </p>

                        </div>


                        <div className="configuracion-font-grid">

                            <button
                                type="button"
                                className={
                                    preferencias.fuente === "inter"
                                        ? "configuracion-font active"
                                        : "configuracion-font"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "fuente",
                                        "inter"
                                    )
                                }
                            >
                                <strong className="font-inter">
                                    Inter
                                </strong>

                                <span>
                                    {t("modernaLimpia")}
                                </span>
                            </button>


                            <button
                                type="button"
                                className={
                                    preferencias.fuente === "arial"
                                        ? "configuracion-font active"
                                        : "configuracion-font"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "fuente",
                                        "arial"
                                    )
                                }
                            >
                                <strong className="font-arial">
                                    Arial
                                </strong>

                                <span>
                                    {t("simpleFamiliar")}
                                </span>
                            </button>


                            <button
                                type="button"
                                className={
                                    preferencias.fuente === "verdana"
                                        ? "configuracion-font active"
                                        : "configuracion-font"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "fuente",
                                        "verdana"
                                    )
                                }
                            >
                                <strong className="font-verdana">
                                    Verdana
                                </strong>

                                <span>
                                    {t("altaLegibilidad")}
                                </span>
                            </button>


                            <button
                                type="button"
                                className={
                                    preferencias.fuente === "georgia"
                                        ? "configuracion-font active"
                                        : "configuracion-font"
                                }
                                onClick={() =>
                                    cambiarPreferencia(
                                        "fuente",
                                        "georgia"
                                    )
                                }
                            >
                                <strong className="font-georgia">
                                    Georgia
                                </strong>

                                <span>
                                    {t("estiloSerif")}
                                </span>
                            </button>

                        </div>

                    </div>


                    <div className="configuracion-divider"></div>


                    {/* ACCESIBILIDAD */}

                    <div className="configuracion-section">

                        <div className="configuracion-section-header">

                            <span className="configuracion-section-label">
                                {t("accesibilidad")}
                            </span>

                            <h2>
                                {t("opcionesAccesibilidad")}
                            </h2>

                            <p>
                                {t("activaOpciones")}
                            </p>

                        </div>


                        <div className="configuracion-accessibility">

                            <div className="configuracion-option">

                                <div className="configuracion-option-info">

                                    <strong>
                                        {t("altoContraste")}
                                    </strong>

                                    <span>
                                        {t("aumentaDiferencia")}
                                    </span>

                                </div>


                                <button
                                    type="button"
                                    className={
                                        preferencias.altoContraste
                                            ? "configuracion-toggle active"
                                            : "configuracion-toggle"
                                    }
                                    onClick={() =>
                                        cambiarPreferencia(
                                            "altoContraste",
                                            !preferencias.altoContraste
                                        )
                                    }
                                    aria-pressed={
                                        preferencias.altoContraste
                                    }
                                >
                                    <span className="toggle-circle"></span>
                                </button>

                            </div>


                            <div className="configuracion-option">

                                <div className="configuracion-option-info">

                                    <strong>
                                        {t("reducirAnimaciones")}
                                    </strong>

                                    <span>
                                        {t("reduceTransiciones")}
                                    </span>

                                </div>


                                <button
                                    type="button"
                                    className={
                                        preferencias.reducirAnimaciones
                                            ? "configuracion-toggle active"
                                            : "configuracion-toggle"
                                    }
                                    onClick={() =>
                                        cambiarPreferencia(
                                            "reducirAnimaciones",
                                            !preferencias.reducirAnimaciones
                                        )
                                    }
                                    aria-pressed={
                                        preferencias.reducirAnimaciones
                                    }
                                >
                                    <span className="toggle-circle"></span>
                                </button>

                            </div>

                        </div>

                    </div>


                    <div className="configuracion-divider"></div>


                    <div className="configuracion-footer">

                        <span>
                            {t("preferenciasGuardadas")}
                        </span>

                        <button
                            type="button"
                            className="configuracion-reset"
                            onClick={restablecerPreferencias}
                        >
                            {t("restablecerPreferencias")}
                        </button>

                    </div>

                </section>

            </div>

        </main>
    );
}

export default Configuracion;