import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoutes() {
    const {
        isAuthenticated,
        loadingAuth
    } = useAuth();

    if (loadingAuth) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
}

export default PrivateRoutes;