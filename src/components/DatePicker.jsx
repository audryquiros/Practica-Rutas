import { useEffect, useMemo, useRef, useState } from "react";

import { useLanguage } from "../context/LanguageContext";

import "./DatePicker.css";

function convertirFecha(valor) {
    if (!valor) return null;

    const [year, month, day] = valor.split("-").map(Number);

    if (!year || !month || !day) return null;

    return new Date(year, month - 1, day);
}

function convertirAValor(fecha) {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function esMismaFecha(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function DatePicker({ value, onChange, id, name, label }) {
    const { idioma } = useLanguage();
    const contenedorRef = useRef(null);

    const fechaSeleccionada = useMemo(
        () => convertirFecha(value),
        [value]
    );

    const hoy = useMemo(() => {
        const fecha = new Date();
        fecha.setHours(0, 0, 0, 0);
        return fecha;
    }, []);

    const [abierto, setAbierto] = useState(false);
    const [mesVisible, setMesVisible] = useState(
        () => fechaSeleccionada || hoy
    );

    useEffect(() => {
        if (fechaSeleccionada) {
            setMesVisible(fechaSeleccionada);
        }
    }, [value]);

    useEffect(() => {
        const cerrarAlHacerClickAfuera = (event) => {
            if (
                contenedorRef.current &&
                !contenedorRef.current.contains(event.target)
            ) {
                setAbierto(false);
            }
        };

        document.addEventListener(
            "mousedown",
            cerrarAlHacerClickAfuera
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                cerrarAlHacerClickAfuera
            );
        };
    }, []);

    const year = mesVisible.getFullYear();
    const month = mesVisible.getMonth();

    const diasDelMes = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const primerDia = (
        new Date(year, month, 1).getDay() + 6
    ) % 7;

    const totalCeldas = Math.ceil(
        (primerDia + diasDelMes) / 7
    ) * 7;

    const dias = Array.from(
        { length: totalCeldas },
        (_, index) => {
            const numero = index - primerDia + 1;

            if (numero < 1 || numero > diasDelMes) {
                return null;
            }

            return new Date(year, month, numero);
        }
    );

    const mesYAnio = new Intl.DateTimeFormat(
        idioma === "en" ? "en-US" : "es-CR",
        {
            month: "long",
            year: "numeric"
        }
    ).format(mesVisible);

    const textoSeleccionado = fechaSeleccionada
        ? new Intl.DateTimeFormat(
            idioma === "en" ? "en-US" : "es-CR",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).format(fechaSeleccionada)
        : idioma === "en"
            ? "Select a date"
            : "Selecciona una fecha";

    const diasSemana = idioma === "en"
        ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        : ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    const cambiarMes = (cantidad) => {
        setMesVisible(
            new Date(year, month + cantidad, 1)
        );
    };

    const seleccionarFecha = (fecha) => {
        onChange({
            target: {
                name,
                value: convertirAValor(fecha)
            }
        });
        setAbierto(false);
    };

    const seleccionarHoy = () => {
        seleccionarFecha(hoy);
        setMesVisible(hoy);
    };

    const borrarFecha = () => {
        onChange({
            target: {
                name,
                value: ""
            }
        });
        setAbierto(false);
    };

    return (
        <div
            className="date-picker"
            ref={contenedorRef}
        >
            <button
                type="button"
                id={id}
                className={`date-picker-trigger ${
                    abierto ? "is-open" : ""
                } ${!fechaSeleccionada ? "is-empty" : ""}`}
                onClick={() => setAbierto((actual) => !actual)}
                aria-haspopup="dialog"
                aria-expanded={abierto}
                aria-label={label}
            >
                <span className="date-picker-icon" aria-hidden="true">
                    ◫
                </span>
                <span>{textoSeleccionado}</span>
                <span className="date-picker-chevron" aria-hidden="true">
                    ⌄
                </span>
            </button>

            {abierto && (
                <div
                    className="date-picker-popover"
                    role="dialog"
                    aria-label={label}
                >
                    <div className="date-picker-header">
                        <button
                            type="button"
                            className="date-picker-month-button"
                            onClick={() => setMesVisible(hoy)}
                        >
                            {mesYAnio}
                        </button>

                        <div className="date-picker-navigation">
                            <button
                                type="button"
                                onClick={() => cambiarMes(-1)}
                                aria-label={idioma === "en" ? "Previous month" : "Mes anterior"}
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={() => cambiarMes(1)}
                                aria-label={idioma === "en" ? "Next month" : "Mes siguiente"}
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    <div className="date-picker-weekdays">
                        {diasSemana.map((dia) => (
                            <span key={dia}>{dia}</span>
                        ))}
                    </div>

                    <div className="date-picker-grid">
                        {dias.map((fecha, index) => {
                            if (!fecha) {
                                return (
                                    <span
                                        key={`empty-${index}`}
                                        className="date-picker-empty"
                                    />
                                );
                            }

                            const seleccionada =
                                fechaSeleccionada &&
                                esMismaFecha(fecha, fechaSeleccionada);

                            const esHoy = esMismaFecha(fecha, hoy);

                            return (
                                <button
                                    key={convertirAValor(fecha)}
                                    type="button"
                                    className={`date-picker-day ${
                                        seleccionada ? "selected" : ""
                                    } ${esHoy ? "today" : ""}`}
                                    onClick={() => seleccionarFecha(fecha)}
                                >
                                    {fecha.getDate()}
                                </button>
                            );
                        })}
                    </div>

                    <div className="date-picker-footer">
                        <button
                            type="button"
                            onClick={borrarFecha}
                            disabled={!value}
                        >
                            {idioma === "en" ? "Clear" : "Borrar"}
                        </button>

                        <button
                            type="button"
                            onClick={seleccionarHoy}
                        >
                            {idioma === "en" ? "Today" : "Hoy"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DatePicker;
