import { Link } from "react-router-dom";

import "./Forbidden.css";

function Forbidden() {
    return (
        <main className="forbidden-page">
            <div className="forbidden-container">
                <span className="forbidden-code">
                    403
                </span>

                <span className="forbidden-label">
                    ACCESO RESTRINGIDO
                </span>

                <h1>
                    Acceso denegado
                </h1>

                <p>
                    La ruta existe, pero tu cuenta no tiene
                    los permisos necesarios para acceder a
                    este contenido.
                </p>

                <Link
                    to="/dashboard"
                    className="forbidden-button"
                >
                    Volver al dashboard
                </Link>
            </div>
        </main>
    );
}

export default Forbidden;