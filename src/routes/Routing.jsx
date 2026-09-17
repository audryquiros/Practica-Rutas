import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registro from "../pages/Registro/Registro";
import Dashboard from "../pages/Dashboard/Dashboard";
import Perfil from "../pages/Perfil/Perfil";
import Configuracion from "../pages/Configuracion/Configuracion";
import Ayuda from "../pages/Ayuda/Ayuda";
import Pago from "../pages/Pago/Pago";
import Admin from "../pages/Admin/Admin";
import Usuarios from "../pages/Usuarios/Usuarios";
import Forbidden from "../pages/Forbidden/Forbidden";
import NotFound from "../pages/NotFound/NotFound";

import PrivateRoutes from "./PrivateRoutes";
import GuestRoutes from "./GuestRoutes";
import RoleRoutes from "./RoleRoutes";

function Routing() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>

                {/* =========================
                    RUTAS PÚBLICAS
                ========================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/ayuda"
                    element={<Ayuda />}
                />

                <Route
                    path="/403"
                    element={<Forbidden />}
                />

                {/* =========================
                    RUTAS SOLO INVITADO
                ========================= */}

                <Route element={<GuestRoutes />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/registro"
                        element={<Registro />}
                    />

                </Route>

                {/* =========================
                    RUTAS PRIVADAS
                ========================= */}

                <Route element={<PrivateRoutes />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/perfil"
                        element={<Perfil />}
                    />

                    <Route
                        path="/perfil/configuracion"
                        element={<Configuracion />}
                    />

                    <Route
                        path="/configuracion"
                        element={<Configuracion />}
                    />

                    <Route
                        path="/pago/:cursoId"
                        element={<Pago />}
                    />

                    {/* =========================
                        RUTAS POR ROL
                    ========================= */}

                    <Route
                        element={
                            <RoleRoutes
                                requiredRole="admin"
                            />
                        }
                    >

                        <Route
                            path="/admin"
                            element={<Admin />}
                        />

                        <Route
                            path="/dashboard/usuarios"
                            element={<Usuarios />}
                        />

                    </Route>

                </Route>

                {/* =========================
                    404
                ========================= */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default Routing;