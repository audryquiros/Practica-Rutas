import "./Perfil.css";

function Perfil() {
    return (
        <main className="perfil-page">
            <div className="perfil-container">

                <div className="perfil-header">
                    <span className="perfil-label">
                        MI CUENTA
                    </span>

                    <h1>Mi perfil</h1>

                    <p>
                        Consulta y administra tu información personal.
                    </p>
                </div>

                <section className="perfil-card">

                    <div className="perfil-avatar">
                        U
                    </div>

                    <div className="perfil-info">
                        <h2>Usuario</h2>

                        <p>
                            usuario@email.com
                        </p>
                    </div>

                </section>

            </div>
        </main>
    );
}

export default Perfil;