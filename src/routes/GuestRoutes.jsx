import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoutes() {
    const { isAuthenticated, loadingAuth, user } = useAuth();

    if (loadingAuth) {
        return (
            <div className="auth-loading">
                Verificando sesión…
            </div>
        );
    }

    if (isAuthenticated) {
        if (user?.role === "admin") {
            return <Navigate to="/admin" replace />;
        }

        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default GuestRoutes;