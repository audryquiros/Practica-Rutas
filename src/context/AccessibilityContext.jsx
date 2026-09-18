import { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext();

const ACCESIBILIDAD_INICIAL = {
    tamanioLetra: "normal",
    fuente: "inter",
    altoContraste: false,
    reducirAnimaciones: false
};

const CLAVE_ACCESIBILIDAD = "learnixAccesibilidad";
const CLAVE_LEGACY = "preferenciasLearnix";

const escalasLetra = {
    "muy-pequena": 0.85,
    pequena: 0.92,
    normal: 1,
    grande: 1.10,
    "muy-grande": 1.20
};

function obtenerInicial() {
    const guardado = localStorage.getItem(CLAVE_ACCESIBILIDAD);
    if (guardado) {
        try {
            return { ...ACCESIBILIDAD_INICIAL, ...JSON.parse(guardado) };
        } catch {
            // Continuar con valores por defecto.
        }
    }

    try {
        const legacy = JSON.parse(localStorage.getItem(CLAVE_LEGACY) || "{}");
        return {
            ...ACCESIBILIDAD_INICIAL,
            ...(Object.fromEntries(
                Object.keys(ACCESIBILIDAD_INICIAL)
                    .filter((clave) => legacy[clave] !== undefined)
                    .map((clave) => [clave, legacy[clave]])
            ))
        };
    } catch {
        return { ...ACCESIBILIDAD_INICIAL };
    }
}

function aplicarEscalaGlobal(escala) {
    document.querySelectorAll("body *").forEach((elemento) => {
        if (elemento.matches("script, style, svg, path, circle, rect, line, polyline, polygon")) return;

        const fontSize = parseFloat(window.getComputedStyle(elemento).fontSize);
        if (!fontSize || Number.isNaN(fontSize)) return;

        if (!elemento.dataset.learnixOriginalFontSize) {
            elemento.dataset.learnixOriginalFontSize = fontSize;
        }

        const original = parseFloat(elemento.dataset.learnixOriginalFontSize);
        if (!original || Number.isNaN(original)) return;

        elemento.style.setProperty("font-size", `${original * escala}px`, "important");
    });
}

function limpiarEscalaGlobal() {
    document.querySelectorAll("[data-learnix-original-font-size]").forEach((elemento) => {
        elemento.style.removeProperty("font-size");
        delete elemento.dataset.learnixOriginalFontSize;
    });
}

export function AccessibilityProvider({ children }) {
    const [accesibilidad, setAccesibilidad] = useState(obtenerInicial);

    useEffect(() => {
        localStorage.setItem(CLAVE_ACCESIBILIDAD, JSON.stringify(accesibilidad));

        const root = document.documentElement;
        root.dataset.tamanio = accesibilidad.tamanioLetra;
        root.dataset.fuente = accesibilidad.fuente;
        root.dataset.contraste = accesibilidad.altoContraste ? "alto" : "normal";
        root.dataset.animaciones = accesibilidad.reducirAnimaciones ? "reducidas" : "normales";

        const escala = escalasLetra[accesibilidad.tamanioLetra] || 1;
        root.style.setProperty("--learnix-font-scale", escala);

        requestAnimationFrame(() => aplicarEscalaGlobal(escala));
    }, [accesibilidad]);

    useEffect(() => {
        const escala = escalasLetra[accesibilidad.tamanioLetra] || 1;
        const observer = new MutationObserver(() => {
            requestAnimationFrame(() => aplicarEscalaGlobal(escala));
        });

        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [accesibilidad.tamanioLetra]);

    const cambiarAccesibilidad = (propiedad, valor) => {
        setAccesibilidad((actual) => ({ ...actual, [propiedad]: valor }));
    };

    const restablecerAccesibilidad = () => {
        limpiarEscalaGlobal();
        setAccesibilidad({ ...ACCESIBILIDAD_INICIAL });
    };

    return (
        <AccessibilityContext.Provider value={{
            accesibilidad,
            cambiarAccesibilidad,
            restablecerAccesibilidad
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    return useContext(AccessibilityContext);
}
