import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const [isAuthenticated, setIsAuthenticated] =
        useState(false);

    const [loadingAuth, setLoadingAuth] =
        useState(true);

    useEffect(() => {
        const usuarioGuardado =
            localStorage.getItem("usuario");

        if (usuarioGuardado) {
            try {
                const usuario =
                    JSON.parse(usuarioGuardado);

                const usuarioNormalizado = {
                    ...usuario,
                    role: usuario.role || "user"
                };

                setUser(usuarioNormalizado);
                setIsAuthenticated(true);

            } catch (error) {
                console.error(
                    "No se pudo recuperar la sesión:",
                    error
                );

                localStorage.removeItem("usuario");
            }
        }

        setLoadingAuth(false);
    }, []);

    const login = (usuario) => {
        const usuarioNormalizado = {
            ...usuario,
            role: usuario.role || "user"
        };

        setUser(usuarioNormalizado);
        setIsAuthenticated(true);

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuarioNormalizado)
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
    return useContext(AuthContext);
}