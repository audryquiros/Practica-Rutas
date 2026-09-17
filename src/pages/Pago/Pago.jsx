import "./Pago.css";

function Pago() {
    return (
        <main className="pago-page">
            <div className="pago-container">

                <div className="pago-header">
                    <span className="pago-label">
                        MATRÍCULA
                    </span>

                    <h1>Completar matrícula</h1>

                    <p>
                        Revisa la información y completa el proceso
                        de inscripción.
                    </p>
                </div>

                <section className="pago-card">

                    <div className="pago-course">
                        <span>CURSO SELECCIONADO</span>

                        <h2>Curso seleccionado</h2>

                        <p>
                            Aquí aparecerá la información del curso
                            seleccionado.
                        </p>
                    </div>

                    <div className="pago-divider"></div>

                    <form className="pago-form">

                        <div className="form-group">
                            <label htmlFor="card">
                                Número de tarjeta
                            </label>

                            <input
                                id="card"
                                type="text"
                                placeholder="0000 0000 0000 0000"
                            />
                        </div>

                        <div className="pago-row">

                            <div className="form-group">
                                <label htmlFor="expiry">
                                    Vencimiento
                                </label>

                                <input
                                    id="expiry"
                                    type="text"
                                    placeholder="MM/AA"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cvv">
                                    CVV
                                </label>

                                <input
                                    id="cvv"
                                    type="text"
                                    placeholder="000"
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="pago-button"
                        >
                            Confirmar matrícula
                        </button>

                    </form>

                </section>

            </div>
        </main>
    );
}

export default Pago;