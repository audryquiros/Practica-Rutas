import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext =
    createContext();

const normalizarRol = (role) => {

    if (role === "admin") {
        return "admin";
    }

    return "usuario";
};

export function AuthProvider({
    children
}) {
    const [user, setUser] =
        useState(null);

    const [authStatus, setAuthStatus] =
        useState("verificando");

    useEffect(() => {

        const recuperarSesion =
            () => {

                const usuarioGuardado =
                    localStorage.getItem(
                        "usuario"
                    );

                if (!usuarioGuardado) {

                    setUser(null);

                    setAuthStatus(
                        "no-autenticado"
                    );

                    return;
                }

                try {

                    const usuario =
                        JSON.parse(
                            usuarioGuardado
                        );

                    const usuarioNormalizado =
                        {
                            ...usuario,
                            role:
                                normalizarRol(
                                    usuario.role
                                )
                        };

                    setUser(
                        usuarioNormalizado
                    );

                    setAuthStatus(
                        "autenticado"
                    );

                } catch (error) {

                    console.error(
                        "No se pudo recuperar la sesión:",
                        error
                    );

                    localStorage.removeItem(
                        "usuario"
                    );

                    setUser(null);

                    setAuthStatus(
                        "no-autenticado"
                    );
                }
            };

        recuperarSesion();

    }, []);

    useEffect(() => {

        const manejarStorage =
            (event) => {

                if (
                    event.key !==
                    "usuario"
                ) {
                    return;
                }

                if (!event.newValue) {

                    setUser(null);

                    setAuthStatus(
                        "no-autenticado"
                    );

                    return;
                }

                try {

                    const usuario =
                        JSON.parse(
                            event.newValue
                        );

                    const usuarioNormalizado =
                        {
                            ...usuario,
                            role:
                                normalizarRol(
                                    usuario.role
                                )
                        };

                    setUser(
                        usuarioNormalizado
                    );

                    setAuthStatus(
                        "autenticado"
                    );

                } catch (error) {

                    console.error(
                        "No se pudo sincronizar la sesión:",
                        error
                    );

                    setUser(null);

                    setAuthStatus(
                        "no-autenticado"
                    );
                }
            };

        window.addEventListener(
            "storage",
            manejarStorage
        );

        return () => {
            window.removeEventListener(
                "storage",
                manejarStorage
            );
        };

    }, []);

    const login = (usuario) => {

        const usuarioNormalizado =
            {
                ...usuario,
                role:
                    normalizarRol(
                        usuario.role
                    )
            };

        setUser(
            usuarioNormalizado
        );

        setAuthStatus(
            "autenticado"
        );

        localStorage.setItem(
            "usuario",
            JSON.stringify(
                usuarioNormalizado
            )
        );
    };

    const logout = () => {

        setUser(null);

        setAuthStatus(
            "no-autenticado"
        );

        localStorage.removeItem(
            "usuario"
        );
    };

    const isAuthenticated =
        authStatus ===
        "autenticado";

    const loadingAuth =
        authStatus ===
        "verificando";

    return (
        <AuthContext.Provider
            value={{
                user,
                authStatus,
                isAuthenticated,
                loadingAuth,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(
        AuthContext
    );
}