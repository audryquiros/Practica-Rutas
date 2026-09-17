import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const ThemeContext = createContext();

const preferenciasIniciales = {
    tema: "claro",
    idioma: "es",
    tamanioLetra: "normal",
    fuente: "inter",
    altoContraste: false,
    reducirAnimaciones: false
};

const traducciones = {
    es: {
        inicio: "Inicio",
        misCursos: "Mis cursos",
        administracion: "Administración",
        ayuda: "Ayuda",
        perfil: "Mi perfil",
        configuracion: "Configuración",
        cerrarSesion: "Cerrar sesión",

        iniciarSesion: "Iniciar sesión",
        crearCuenta: "Crear cuenta",

        bienvenidoDeNuevo: "BIENVENIDO DE NUEVO",
        iniciaSesion: "Inicia sesión",
        accesoCuenta:
            "Accede a tu cuenta para continuar con tu aprendizaje.",

        correoElectronico: "Correo electrónico",
        contrasena: "Contraseña",

        completaTodosCampos:
            "Completa todos los campos.",

        correoNoRegistrado:
            "El correo no está registrado.",

        contrasenaIncorrecta:
            "La contraseña es incorrecta.",

        iniciandoSesion:
            "Iniciando sesión...",

        errorLogin:
            "No se pudo iniciar sesión. Intenta nuevamente.",

        cuentaCreada:
            "Cuenta creada correctamente. Ahora puedes iniciar sesión.",

        noTienesCuenta:
            "¿No tienes una cuenta?"
    },

    en: {
        inicio: "Home",
        misCursos: "My courses",
        administracion: "Administration",
        ayuda: "Help",
        perfil: "My profile",
        configuracion: "Settings",
        cerrarSesion: "Log out",

        iniciarSesion: "Log in",
        crearCuenta: "Create account",

        bienvenidoDeNuevo: "WELCOME BACK",
        iniciaSesion: "Log in",
        accesoCuenta:
            "Access your account to continue your learning.",

        correoElectronico: "Email address",
        contrasena: "Password",

        completaTodosCampos:
            "Complete all fields.",

        correoNoRegistrado:
            "This email is not registered.",

        contrasenaIncorrecta:
            "The password is incorrect.",

        iniciandoSesion:
            "Logging in...",

        errorLogin:
            "Could not log in. Please try again.",

        cuentaCreada:
            "Account created successfully. You can now log in.",

        noTienesCuenta:
            "Don't have an account?"
    }
};

export function ThemeProvider({ children }) {
    const [preferencias, setPreferencias] = useState(() => {
        const guardadas =
            localStorage.getItem("preferenciasLearnix");

        if (!guardadas) {
            return preferenciasIniciales;
        }

        try {
            return {
                ...preferenciasIniciales,
                ...JSON.parse(guardadas)
            };
        } catch {
            return preferenciasIniciales;
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "preferenciasLearnix",
            JSON.stringify(preferencias)
        );

        const root = document.documentElement;

        root.dataset.tema =
            preferencias.tema;

        root.dataset.tamanio =
            preferencias.tamanioLetra;

        root.dataset.fuente =
            preferencias.fuente;

        root.dataset.contraste =
            preferencias.altoContraste
                ? "alto"
                : "normal";

        root.dataset.animaciones =
            preferencias.reducirAnimaciones
                ? "reducidas"
                : "normales";
    }, [preferencias]);

    const cambiarPreferencia = (
        propiedad,
        valor
    ) => {
        setPreferencias((actuales) => ({
            ...actuales,
            [propiedad]: valor
        }));
    };

    const restablecerPreferencias = () => {
        setPreferencias({
            ...preferenciasIniciales
        });
    };

    const t = (clave) => {
        return (
            traducciones[
                preferencias.idioma
            ]?.[clave] || clave
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                preferencias,
                cambiarPreferencia,
                restablecerPreferencias,
                t
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}