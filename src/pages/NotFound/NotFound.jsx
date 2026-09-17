import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <main className="not-found-page">
            <div className="not-found-container">

                <span className="not-found-code">
                    404
                </span>

                <h1>Página no encontrada</h1>

                <p>
                    La página que estás buscando no existe
                    o fue movida.
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