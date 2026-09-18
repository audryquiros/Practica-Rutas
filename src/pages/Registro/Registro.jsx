import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";

import {
    obtenerUsuarioPorEmail,
    registrarUsuario
} from "../../services/usuariosService";

import "./Registro.css";

function Registro() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const manejarRegistro = async (event) => {
        event.preventDefault();

        setError("");

        if (
            !nombre.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmarPassword.trim()
        ) {
            setError(
                t("completaTodosCampos")
            );

            return;
        }

        if (password.length < 6) {
            setError(
                t("minimoCaracteres")
            );

            return;
        }

        if (password !== confirmarPassword) {
            setError(
                t("contrasenasNoCoinciden")
            );

            return;
        }

        try {
            setLoading(true);

            const usuarioExistente =
                await obtenerUsuarioPorEmail(
                    email.trim()
                );

            if (usuarioExistente) {
                setError(
                    t("correoYaExiste")
                );

                return;
            }

            await registrarUsuario({
                nombre: nombre.trim(),
                email: email
                    .trim()
                    .toLowerCase(),
                password,
                role: "usuario"
            });

            navigate(
                "/login",
                {
                    replace: true,
                    state: {
                        registroExitoso: true,
                        email: email
                            .trim()
                            .toLowerCase()
                    }
                }
            );

        } catch (error) {
            console.error(error);

            setError(
                t("cuentaNoCreada")
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="registro-page">

            <section className="registro-container">

                {/* LOGO */}

                <div className="registro-brand-area">
                    <Link
                        to="/"
                        className="registro-logo"
                        aria-label="Learnix"
                    >
                        <img
                            src="/logo.png"
                            alt="Learnix"
                        />
                    </Link>
                </div>

                {/* ENCABEZADO */}

                <div className="registro-header">

                    <span className="registro-label">
                        {t("comienzaAprender")}
                    </span>

                    <h1>
                        {t("creaTuCuenta")}
                    </h1>

                    <p>
                        {t("registroDescripcion")}
                    </p>

                </div>

                {/* FORMULARIO */}

                <form
                    className="registro-form"
                    onSubmit={manejarRegistro}
                >

                    <div className="form-group">

                        <label htmlFor="nombre">
                            {t("nombreCompleto")}
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(event) => {
                                setNombre(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder={t("tuNombre")}
                            autoComplete="name"
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="registro-email">
                            {t("correoElectronico")}
                        </label>

                        <input
                            id="registro-email"
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder="tu@email.com"
                            autoComplete="email"
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="registro-password">
                            {t("contrasena")}
                        </label>

                        <input
                            id="registro-password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder={t("minimoCaracteres")}
                            autoComplete="new-password"
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="confirmar-password">
                            {t("repiteContrasena")}
                        </label>

                        <input
                            id="confirmar-password"
                            type="password"
                            value={confirmarPassword}
                            onChange={(event) => {
                                setConfirmarPassword(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder={t("repiteContrasena")}
                            autoComplete="new-password"
                        />

                    </div>

                    {error && (
                        <p className="registro-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="registro-button"
                        disabled={loading}
                    >
                        {loading
                            ? t("creandoCuenta")
                            : t("crearCuentaTexto")
                        }
                    </button>

                </form>

                {/* LOGIN */}

                <p className="registro-login">

                    <span>
                        {t("yaTienesCuenta")}
                    </span>

                    <Link to="/login">
                        {t("iniciarSesion")}
                    </Link>

                </p>

            </section>

        </main>
    );
}

export default Registro;