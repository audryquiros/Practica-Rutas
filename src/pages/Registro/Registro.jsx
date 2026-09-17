import { Link } from "react-router-dom";
import "./Registro.css";

function Registro() {
    return (
        <main className="registro-page">
            <section className="registro-container">

                <div className="registro-header">
                    <span className="registro-label">
                        COMIENZA A APRENDER
                    </span>

                    <h1>Crear una cuenta</h1>

                    <p>
                        Regístrate para acceder a nuestros cursos
                        y comenzar tu aprendizaje.
                    </p>
                </div>

                <form className="registro-form">

                    <div className="form-group">
                        <label htmlFor="nombre">
                            Nombre completo
                        </label>

                        <input
                            type="text"
                            id="nombre"
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="registro-email">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="registro-email"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="registro-password">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="registro-password"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="registro-button">
                        Crear cuenta
                    </button>

                </form>

                <p className="registro-login">
                    ¿Ya tienes una cuenta?
                    <Link to="/login">
                        Iniciar sesión
                    </Link>
                </p>

            </section>
        </main>
    );
}

export default Registro;