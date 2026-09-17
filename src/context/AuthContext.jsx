import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const usuarioGuardado = localStorage.getItem("usuario");

        if (usuarioGuardado) {

            const usuario = JSON.parse(usuarioGuardado);

            setUser(usuario);
            setIsAuthenticated(true);

        }

    }, []);

    const login = (nombre) => {

        const usuario = {
            nombre: nombre.trim()
        };

        setUser(usuario);
        setIsAuthenticated(true);

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );
    };

    const logout = () => {

        setUser(null);
        setIsAuthenticated(false);

        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}