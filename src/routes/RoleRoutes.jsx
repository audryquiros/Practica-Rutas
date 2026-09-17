import {
    Navigate,
    Outlet
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function RoleRoutes({ requiredRole }) {
    const {
        user,
        authStatus
    } = useAuth();

    if (authStatus === "verificando") {
        return (
            <main className="auth-verification-page">
                <div className="auth-verification-card">
                    <span className="auth-verification-label">
                        LEARNIX
                    </span>

                    <h1>
                        Verificando sesión…
                    </h1>

                    <p>
                        Estamos comprobando tu sesión.
                    </p>
                </div>
            </main>
        );
    }

    if (authStatus === "no-autenticado") {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (user?.role !== requiredRole) {
        return (
            <Navigate
                to="/403"
                replace
            />
        );
    }

    return <Outlet />;
}

export default RoleRoutes;