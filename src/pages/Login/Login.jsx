import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { obtenerUsuarioPorEmail } from "../../services/usuariosService";

import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const manejarLogin = async (event) => {
        event.preventDefault();

        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Completa todos los campos.");
            return;
        }

        try {
            setLoading(true);

            const usuario = await obtenerUsuarioPorEmail(email);

            if (!usuario) {
                setError("El correo no está registrado.");
                return;
            }

            if (usuario.password !== password) {
                setError("La contraseña es incorrecta.");
                return;
            }

            login(usuario);

            navigate("/dashboard");

        } catch (error) {
            console.error(error);

            setError(
                "No se pudo iniciar sesión. Intenta nuevamente."
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
                        BIENVENIDO DE NUEVO
                    </span>

                    <h1>Inicia sesión</h1>

                    <p>
                        Accede a tu cuenta para continuar
                        con tu aprendizaje.
                    </p>

                </div>

                <form
                    className="login-form"
                    onSubmit={manejarLogin}
                >

                    <div className="form-group">

                        <label htmlFor="email">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setError("");
                            }}
                            placeholder="tu@email.com"
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError("");
                            }}
                            placeholder="••••••••"
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
                            ? "Iniciando sesión..."
                            : "Iniciar sesión"}
                    </button>

                </form>

                <p className="login-register">
                    ¿No tienes una cuenta?

                    <Link to="/registro">
                        Crear cuenta
                    </Link>
                </p>

            </section>
        </main>
    );
}

export default Login;