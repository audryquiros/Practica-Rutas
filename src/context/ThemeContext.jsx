import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const TEMA_POR_DEFECTO = "oscuro";
const CLAVE_TEMA = "learnixTema";
const CLAVE_LEGACY = "preferenciasLearnix";

function obtenerTemaInicial() {
    const guardado = localStorage.getItem(CLAVE_TEMA);
    if (["claro", "oscuro", "lavanda", "azul"].includes(guardado)) return guardado;

    try {
        const legacy = JSON.parse(localStorage.getItem(CLAVE_LEGACY) || "{}");
        if (["claro", "oscuro", "lavanda", "azul"].includes(legacy.tema)) return legacy.tema;
    } catch {
        // Usar tema por defecto.
    }

    return TEMA_POR_DEFECTO;
}

export function ThemeProvider({ children }) {
    const [tema, setTema] = useState(obtenerTemaInicial);

    useEffect(() => {
        localStorage.setItem(CLAVE_TEMA, tema);
        document.documentElement.dataset.tema = tema;
    }, [tema]);

    const cambiarTema = (nuevoTema) => {
        if (["claro", "oscuro", "lavanda", "azul"].includes(nuevoTema)) setTema(nuevoTema);
    };

    const restablecerTema = () => setTema(TEMA_POR_DEFECTO);

    return (
        <ThemeContext.Provider value={{ tema, cambiarTema, restablecerTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
