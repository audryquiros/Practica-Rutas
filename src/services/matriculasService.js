const API_URL = "http://localhost:3001";

export const obtenerMatriculas = async () => {
    const response = await fetch(`${API_URL}/matriculas`);

    if (!response.ok) {
        throw new Error("No se pudieron obtener las matrículas");
    }

    return await response.json();
};

export const obtenerMatriculasPorUsuario = async (usuarioId) => {
    const response = await fetch(
        `${API_URL}/matriculas?usuarioId=${usuarioId}`
    );

    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener las matrículas del usuario"
        );
    }

    return await response.json();
};

export const crearMatricula = async (matricula) => {
    const response = await fetch(`${API_URL}/matriculas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(matricula)
    });

    if (!response.ok) {
        throw new Error("No se pudo crear la matrícula");
    }

    return await response.json();
};