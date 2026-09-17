const API_URL = "http://localhost:3001";

export const obtenerCursos = async () => {
    const response = await fetch(`${API_URL}/cursos`);

    if (!response.ok) {
        throw new Error("No se pudieron obtener los cursos");
    }

    return await response.json();
};

export const obtenerCursoPorId = async (id) => {
    const response = await fetch(`${API_URL}/cursos/${id}`);

    if (!response.ok) {
        throw new Error("No se pudo obtener el curso");
    }

    return await response.json();
};