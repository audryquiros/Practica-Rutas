import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <main className="not-found-page">
            <div className="not-found-container">

                <span className="not-found-code">
                    404
                </span>

                <span className="not-found-label">
                    PÁGINA NO ENCONTRADA
                </span>

                <h1>
                    Esta página no existe.
                </h1>

                <p>
                    La dirección que intentaste visitar no
                    corresponde a ninguna sección disponible
                    de Learnix.
                </p>

                <Link
                    to="/"
                    className="not-found-button"
                >
                    Volver al inicio
                </Link>

            </div>
        </main>
    );
}

export default NotFound;