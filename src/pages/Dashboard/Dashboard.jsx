import "./Dashboard.css";

function Dashboard() {
    return (
        <main className="dashboard-page">
            <div className="dashboard-container">

                <section className="dashboard-header">
                    <div>
                        <span className="dashboard-label">
                            MI ESPACIO
                        </span>

                        <h1>Dashboard</h1>

                        <p>
                            Consulta tu progreso y administra tus cursos.
                        </p>
                    </div>
                </section>

                <section className="dashboard-stats">

                    <article className="dashboard-stat">
                        <span>Cursos matriculados</span>
                        <strong>0</strong>
                    </article>

                    <article className="dashboard-stat">
                        <span>Cursos completados</span>
                        <strong>0</strong>
                    </article>

                    <article className="dashboard-stat">
                        <span>Progreso general</span>
                        <strong>0%</strong>
                    </article>

                </section>

                <section className="dashboard-courses">
                    <div className="dashboard-section-header">
                        <h2>Mis cursos</h2>
                        <p>
                            Aquí aparecerán los cursos en los que te hayas
                            matriculado.
                        </p>
                    </div>

                    <div className="empty-courses">
                        <h3>Aún no tienes cursos</h3>

                        <p>
                            Explora nuestra oferta académica y encuentra
                            un curso para comenzar.
                        </p>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default Dashboard;