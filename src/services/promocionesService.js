const API_URL = "http://localhost:3001";

export const obtenerPromociones = async () => {
    const response = await fetch(
        `${API_URL}/promociones`
    );

    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener las promociones"
        );
    }

    return await response.json();
};

export const obtenerPromocionPorId = async (
    id
) => {
    const response = await fetch(
        `${API_URL}/promociones/${id}`
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo obtener la promoción"
        );
    }

    return await response.json();
};

export const crearPromocion = async (
    promocion
) => {
    const response = await fetch(
        `${API_URL}/promociones`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(promocion)
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo crear la promoción"
        );
    }

    return await response.json();
};

export const actualizarPromocion = async (
    id,
    promocion
) => {
    const response = await fetch(
        `${API_URL}/promociones/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(promocion)
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo actualizar la promoción"
        );
    }

    return await response.json();
};

export const eliminarPromocion = async (
    id
) => {
    const response = await fetch(
        `${API_URL}/promociones/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo eliminar la promoción"
        );
    }

    return true;
};

export const obtenerPromocionesActivas =
    async () => {
        const promociones =
            await obtenerPromociones();

        const hoy =
            new Date()
                .toLocaleDateString(
                    "en-CA"
                );

        return promociones.filter(
            (promocion) =>
                promocion.activa &&
                promocion.fechaInicio <= hoy &&
                promocion.fechaFin >= hoy
        );
    };

export const calcularPrecioPromocional = (
    precio,
    promocion
) => {
    if (!promocion) {
        return Number(precio);
    }

    if (promocion.tipo === "porcentaje") {
        return Math.max(
            0,
            Number(precio) -
                Number(precio) *
                    (Number(promocion.valor) /
                        100)
        );
    }

    if (promocion.tipo === "monto") {
        return Math.max(
            0,
            Number(precio) -
                Number(promocion.valor)
        );
    }

    return Number(precio);
};