import "./Configuracion.css";

function Configuracion() {
    return (
        <main className="config-page">
            <div className="config-container">

                <div className="config-header">
                    <span className="config-label">
                        PREFERENCIAS
                    </span>

                    <h1>Configuración</h1>

                    <p>
                        Personaliza las opciones de tu cuenta.
                    </p>
                </div>

                <section className="config-card">

                    <div className="config-option">
                        <div>
                            <h2>Notificaciones</h2>

                            <p>
                                Recibe información relacionada con tus
                                cursos y matrícula.
                            </p>
                        </div>

                        <input type="checkbox" />
                    </div>

                    <div className="config-option">
                        <div>
                            <h2>Modo oscuro</h2>

                            <p>
                                Cambia la apariencia de la plataforma.
                            </p>
                        </div>

                        <input type="checkbox" />
                    </div>

                </section>

            </div>
        </main>
    );
}

export default Configuracion;