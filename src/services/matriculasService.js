const API_URL = "http://localhost:3001";

export const obtenerMatriculas = async () => {
    const response = await fetch(`${API_URL}/matriculas`);

    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener las matrículas"
        );
    }

    return await response.json();
};

export const obtenerMatriculasPorUsuario = async (usuarioId) => {
    const matriculas = await obtenerMatriculas();

    return matriculas.filter(
        (matricula) =>
            Number(matricula.usuarioId) === Number(usuarioId)
    );
};

export const obtenerMatriculaPorId = async (id) => {
    const response = await fetch(
        `${API_URL}/matriculas/${id}`
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo obtener la matrícula"
        );
    }

    return await response.json();
};

export const crearMatricula = async (matricula) => {
    const response = await fetch(
        `${API_URL}/matriculas`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...matricula,
                usuarioId: Number(matricula.usuarioId),
                cursoId: Number(matricula.cursoId)
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo crear la matrícula"
        );
    }

    return await response.json();
};

export const actualizarMatricula = async (
    id,
    datos
) => {
    const response = await fetch(
        `${API_URL}/matriculas/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo actualizar la matrícula"
        );
    }

    return await response.json();
};