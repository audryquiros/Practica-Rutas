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
import NotFound from "../pages/NotFound/NotFound";

import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";

function Routing() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* RUTAS PÚBLICAS */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/registro"
                    element={<Registro />}
                />

                <Route
                    path="/ayuda"
                    element={<Ayuda />}
                />

                {/* RUTAS PRIVADAS */}

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
                        path="/configuracion"
                        element={<Configuracion />}
                    />

                    <Route
                        path="/pago/:cursoId"
                        element={<Pago />}
                    />

                    {/* RUTAS DE ADMINISTRADOR */}

                    <Route element={<AdminRoutes />}>

                        <Route
                            path="/admin"
                            element={<Admin />}
                        />

                    </Route>

                </Route>

                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default Routing;