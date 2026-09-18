import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./Ayuda.css";

function Ayuda() {
    const { t } = useTheme();

    return (
        <main className="ayuda-page">

            <div className="ayuda-container">

                <section className="ayuda-header">

                    <span className="ayuda-label">
                        {t("centroAyuda")}
                    </span>

                    <h1>
                        {t("comoAyudarte")}
                    </h1>

                    <p>
                        {t("ayudaDescripcion")}
                    </p>

                </section>

                <section className="ayuda-grid">

                    <article className="ayuda-card">

                        <span className="ayuda-number">
                            01
                        </span>

                        <h2>
                            {t("comoMatricularme")}
                        </h2>

                        <p>
                            {t("comoMatricularmeTexto")}
                        </p>

                    </article>

                    <article className="ayuda-card">

                        <span className="ayuda-number">
                            02
                        </span>

                        <h2>
                            {t("dondeVeoCursos")}
                        </h2>

                        <p>
                            {t("dondeVeoCursosTexto")}
                        </p>

                    </article>

                    <article className="ayuda-card">

                        <span className="ayuda-number">
                            03
                        </span>

                        <h2>
                            {t("comoConsultoProgreso")}
                        </h2>

                        <p>
                            {t("comoConsultoProgresoTexto")}
                        </p>

                    </article>

                    <article className="ayuda-card">

                        <span className="ayuda-number">
                            04
                        </span>

                        <h2>
                            {t("necesitoCuenta")}
                        </h2>

                        <p>
                            {t("necesitoCuentaTexto")}
                        </p>

                    </article>

                </section>

                <section className="ayuda-contact">

                    <div>

                        <span className="ayuda-contact-label">
                            {t("todaviaDudas")}
                        </span>

                        <h2>
                            {t("comienzaExplorando")}
                        </h2>

                    </div>

                    <Link
                        to="/"
                        className="ayuda-button"
                    >
                        {t("verCursos")}
                    </Link>

                </section>

            </div>

        </main>
    );
}

export default Ayuda;