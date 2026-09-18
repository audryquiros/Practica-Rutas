const API_URL = "http://localhost:3001";

export const obtenerUsuarios = async () => {
    const response = await fetch(
        `${API_URL}/usuarios`
    );

    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener los usuarios"
        );
    }

    return await response.json();
};

export const obtenerUsuarioPorEmail = async (
    email
) => {
    const response = await fetch(
        `${API_URL}/usuarios?email=${encodeURIComponent(
            email
        )}`
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo obtener el usuario"
        );
    }

    const usuarios = await response.json();

    return usuarios[0] || null;
};

export const registrarUsuario = async (
    usuario
) => {
    const response = await fetch(
        `${API_URL}/usuarios`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo registrar el usuario"
        );
    }

    return await response.json();
};

export const actualizarUsuario = async (
    id,
    datos
) => {
    const response = await fetch(
        `${API_URL}/usuarios/${id}`,
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
            "No se pudo actualizar el usuario"
        );
    }

    return await response.json();
};

export const eliminarUsuario = async (
    id
) => {
    const response = await fetch(
        `${API_URL}/usuarios/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(
            "No se pudo eliminar el usuario"
        );
    }

    return true;
};