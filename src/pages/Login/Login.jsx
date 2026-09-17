import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
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

                <form className="login-form">

                    <div className="form-group">
                        <label htmlFor="email">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="email"
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
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Iniciar sesión
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