import {
    createContext,
    useContext,
    useMemo,
    useState
} from "react";

const CurrencyContext = createContext();

// Referencia de tipo de cambio utilizada para mostrar USD.
// Los precios se almacenan SIEMPRE en colones (CRC).
const USD_TO_CRC = 504.02;

export function CurrencyProvider({ children }) {
    const [moneda, setMoneda] = useState(() => {
        return localStorage.getItem("learnix-moneda") || "CRC";
    });

    const cambiarMoneda = () => {
        setMoneda((actual) => {
            const nueva = actual === "CRC" ? "USD" : "CRC";
            localStorage.setItem("learnix-moneda", nueva);
            return nueva;
        });
    };

    const convertirPrecio = (precioCRC) => {
        const valor = Number(precioCRC) || 0;
        return moneda === "USD" ? valor / USD_TO_CRC : valor;
    };

    const formatearPrecio = (precioCRC) => {
        const valor = convertirPrecio(precioCRC);

        return new Intl.NumberFormat(
            moneda === "USD" ? "en-US" : "es-CR",
            {
                style: "currency",
                currency: moneda,
                minimumFractionDigits: moneda === "USD" ? 2 : 0,
                maximumFractionDigits: moneda === "USD" ? 2 : 0
            }
        ).format(valor);
    };

    const value = useMemo(
        () => ({
            moneda,
            cambiarMoneda,
            convertirPrecio,
            formatearPrecio,
            tipoCambio: USD_TO_CRC
        }),
        [moneda]
    );

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);

    if (!context) {
        throw new Error(
            "useCurrency debe utilizarse dentro de CurrencyProvider."
        );
    }

    return context;
}
