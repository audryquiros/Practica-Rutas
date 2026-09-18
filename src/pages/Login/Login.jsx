import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import {
    obtenerUsuarioPorEmail
} from "../../services/usuariosService";

import "./Login.css";

function Login() {
    const { t } = useTheme();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.registroExitoso) {
            setMensaje(t("cuentaCreada"));

            if (location.state.email) {
                setEmail(location.state.email);
            }

            navigate(
                location.pathname,
                {
                    replace: true,
                    state: {}
                }
            );
        }
    }, [
        location,
        navigate,
        t
    ]);

    const obtenerRutaRetorno = () => {
        const from = location.state?.from;

        if (!from) {
            return null;
        }

        if (typeof from === "string") {
            return from;
        }

        const pathname = from.pathname || "/";
        const search = from.search || "";
        const hash = from.hash || "";

        return `${pathname}${search}${hash}`;
    };

    const manejarLogin = async (event) => {
        event.preventDefault();

        setError("");
        setMensaje("");

        if (!email.trim() || !password.trim()) {
            setError(
                t("completaTodosCampos")
            );

            return;
        }

        try {
            setLoading(true);

            const usuario =
                await obtenerUsuarioPorEmail(
                    email.trim()
                );

            if (!usuario) {
                setError(
                    t("correoNoRegistrado")
                );

                return;
            }

            if (usuario.password !== password) {
                setError(
                    t("contrasenaIncorrecta")
                );

                return;
            }

            login(usuario);

            const rutaRetorno =
                obtenerRutaRetorno();

            if (rutaRetorno) {
                navigate(
                    rutaRetorno,
                    {
                        replace: true
                    }
                );

                return;
            }

            const cursoId =
                location.state?.cursoId;

            if (cursoId) {
                navigate(
                    `/pago/${cursoId}`,
                    {
                        replace: true
                    }
                );

                return;
            }

            if (usuario.role === "admin") {
                navigate(
                    "/admin",
                    {
                        replace: true
                    }
                );

                return;
            }

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );

        } catch (error) {
            console.error(error);

            setError(
                t("errorLogin")
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">

            <section className="login-card">

                <div className="login-brand-area">
                    <img
                        className="login-logo"
                        src="/logo.png"
                        alt="Learnix"
                    />
                </div>

                <div className="login-header">

                    <span className="login-label">
                        {t("bienvenidoDeNuevo")}
                    </span>

                    <h1>
                        {t("iniciarSesion")}
                    </h1>

                    <p>
                        {t("accesoCuenta")}
                    </p>

                </div>

                {mensaje && (
                    <div className="login-message">
                        {mensaje}
                    </div>
                )}

                {error && (
                    <div className="login-error">
                        {error}
                    </div>
                )}

                <form
                    className="login-form"
                    onSubmit={manejarLogin}
                >

                    <div className="login-field">

                        <label htmlFor="email">
                            {t("correoElectronico")}
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder="correo@ejemplo.com"
                            autoComplete="email"
                        />

                    </div>

                    <div className="login-field">

                        <label htmlFor="password">
                            {t("contrasena")}
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(
                                    event.target.value
                                );

                                setError("");
                            }}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? t("iniciandoSesion")
                            : t("iniciarSesion")
                        }
                    </button>

                </form>

                <div className="login-register">

                    <span>
                        {t("noTienesCuenta")}
                    </span>

                    <Link to="/registro">
                        {t("crearCuenta")}
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default Login;