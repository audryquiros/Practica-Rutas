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

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        if (
            location.state?.registroExitoso
        ) {

            setMensaje(
                t("cuentaCreada")
            );

            if (
                location.state.email
            ) {
                setEmail(
                    location.state.email
                );
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

    const manejarLogin = async (
        event
    ) => {

        event.preventDefault();

        setError("");
        setMensaje("");

        if (
            !email.trim() ||
            !password.trim()
        ) {
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

            if (
                usuario.password !==
                password
            ) {

                setError(
                    t("contrasenaIncorrecta")
                );

                return;
            }

            login(usuario);

            const cursoId =
                location.state?.cursoId;

            if (cursoId) {

                navigate(
                    `/pago/${cursoId}`,
                    {
                        replace: true
                    }
                );

            } else {

                navigate(
                    "/dashboard"
                );
            }

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

            <section className="login-container">

                <div className="login-header">

                    <span className="login-label">
                        {t("bienvenidoDeNuevo")}
                    </span>

                    <h1>
                        {t("iniciaSesion")}
                    </h1>

                    <p>
                        {t("accesoCuenta")}
                    </p>

                </div>

                {mensaje && (
                    <p className="login-success">
                        {mensaje}
                    </p>
                )}

                <form
                    className="login-form"
                    onSubmit={manejarLogin}
                >

                    <div className="form-group">

                        <label htmlFor="email">
                            {t(
                                "correoElectronico"
                            )}
                        </label>

                        <input
                            type="email"
                            id="email"
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

                        <label htmlFor="password">
                            {t("contrasena")}
                        </label>

                        <input
                            type="password"
                            id="password"
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

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? t(
                                "iniciandoSesion"
                            )
                            : t(
                                "iniciarSesion"
                            )}
                    </button>

                </form>

                <p className="login-register">

                    {t("noTienesCuenta")}{" "}

                    <Link to="/registro">
                        {t("crearCuenta")}
                    </Link>

                </p>

            </section>

        </main>
    );
}

export default Login;