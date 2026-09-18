import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

/* =========================
   CONFIGURACIÓN GEMINI
========================= */

const MODELO_GEMINI = "gemini-3.6-flash";

const esperar = (milisegundos) =>
    new Promise((resolve) => setTimeout(resolve, milisegundos));

const generarConGemini = async (prompt, config = {}) => {
    const MAX_REINTENTOS = 3;

    for (let intento = 1; intento <= MAX_REINTENTOS; intento++) {
        try {
            return await ai.models.generateContent({
                model: MODELO_GEMINI,
                contents: prompt,
                config
            });
        } catch (error) {
            const esTemporal =
                error?.status === 503 ||
                error?.status === 429;

            if (!esTemporal || intento === MAX_REINTENTOS) {
                throw error;
            }

            const espera = intento * 3000;

            console.log(
                `Gemini no está disponible temporalmente. ` +
                `Reintentando en ${espera / 1000} segundos ` +
                `(${intento}/${MAX_REINTENTOS})...`
            );

            await esperar(espera);
        }
    }
};

/* =========================
   TEST VOCACIONAL
========================= */

app.post("/api/test-vocacional", async (req, res) => {
    try {
        const { respuestas, cursos } = req.body;

        if (!Array.isArray(respuestas)) {
            return res.status(400).json({
                error: "Las respuestas son requeridas."
            });
        }

        if (!Array.isArray(cursos)) {
            return res.status(400).json({
                error: "Los cursos son requeridos."
            });
        }

        /* =========================
           PREPARAR CURSOS
        ========================= */

        const cursosDisponibles = cursos.map((curso) => ({
            id: curso.id,
            nombre: curso.nombre,
            categoria: curso.categoria,
            descripcion: curso.descripcion,
            duracion: curso.duracion,
            precio: curso.precio,
            areas: curso.areas || []
        }));

        /* =========================
           PREPARAR RESPUESTAS
        ========================= */

        const respuestasUsuario = respuestas.map(
            (respuesta, index) => ({
                pregunta: index + 1,
                respuesta: respuesta?.texto || "",
                areas: respuesta?.areas || []
            })
        );

        /* =========================
           PROMPT
        ========================= */

        const prompt = `
Eres el orientador vocacional de Learnix.

Analiza las respuestas del estudiante y recomienda exactamente 3 cursos de la lista disponible.

Considera:
- intereses
- habilidades
- preferencias
- objetivos
- áreas de afinidad

REGLAS:
1. Solo puedes recomendar cursos de la lista.
2. No inventes cursos.
3. No inventes IDs.
4. Usa exactamente el ID proporcionado.
5. Recomienda 3 cursos si existen al menos 3.
6. Explica brevemente la razón de cada recomendación.
7. Genera un perfil vocacional breve.
8. Devuelve únicamente JSON válido.

RESPUESTAS:

${JSON.stringify(respuestasUsuario)}

CURSOS:

${JSON.stringify(cursosDisponibles)}

FORMATO DE RESPUESTA:

{
    "perfil": "perfil vocacional breve",
    "descripcion": "breve explicación del perfil",
    "recomendaciones": [
        {
            "cursoId": "id exacto",
            "razon": "breve explicación"
        }
    ]
}
`;

        /* =========================
           GEMINI
        ========================= */

        console.log(
            "Analizando respuestas con Gemini..."
        );

        const response = await generarConGemini(prompt, {
            responseMimeType: "application/json",
            thinkingConfig: {
                thinkingLevel: "low"
            }
        });

        const texto = response.text;

        console.log(
            "Respuesta recibida de Gemini."
        );

        if (!texto) {
            return res.status(500).json({
                error:
                    "Gemini no devolvió una respuesta."
            });
        }

        /* =========================
           CONVERTIR JSON
        ========================= */

        let resultado;

        try {
            resultado = JSON.parse(texto);
        } catch (error) {
            console.error(
                "Respuesta de Gemini no válida:"
            );

            console.error(texto);

            return res.status(500).json({
                error:
                    "La IA no devolvió un resultado válido."
            });
        }

        /* =========================
           VALIDAR RECOMENDACIONES
        ========================= */

        const recomendaciones =
            Array.isArray(
                resultado.recomendaciones
            )
                ? resultado.recomendaciones
                : [];

        /* =========================
           BUSCAR CURSOS REALES
        ========================= */

        const cursosRecomendados =
            recomendaciones
                .map((recomendacion) => {
                    const curso =
                        cursosDisponibles.find(
                            (item) =>
                                String(item.id) ===
                                String(
                                    recomendacion.cursoId
                                )
                        );

                    if (!curso) {
                        return null;
                    }

                    return {
                        ...curso,

                        razon:
                            recomendacion.razon ||
                            "Este curso coincide con tus intereses."
                    };
                })
                .filter(Boolean)
                .slice(0, 3);

        /* =========================
           RESPUESTA AL FRONTEND
        ========================= */

        return res.json({
            perfil:
                resultado.perfil ||
                "Perfil vocacional",

            descripcion:
                resultado.descripcion || "",

            recomendaciones:
                cursosRecomendados
        });

    } catch (error) {
        console.error(
            "Error procesando el test vocacional:"
        );

        console.error(error);

        /* =========================
           ERRORES DE GEMINI
        ========================= */

        if (error?.status === 429) {
            return res.status(429).json({
                error:
                    "Se alcanzó el límite de uso de Gemini. Inténtalo nuevamente más tarde."
            });
        }

        if (error?.status === 404) {
            return res.status(404).json({
                error:
                    "El modelo de Gemini no está disponible para esta API key."
            });
        }

        return res.status(500).json({
            error:
                "No se pudo procesar el test vocacional."
        });
    }
});



/* =========================
   TRADUCCIÓN DE CURSOS
========================= */

app.post("/api/traducir-curso", async (req, res) => {
    try {
        const { curso } = req.body;

        if (!curso || typeof curso !== "object") {
            return res.status(400).json({
                error: "Los datos del curso son requeridos."
            });
        }

        const prompt = `
Eres el traductor de contenido de una plataforma educativa llamada Learnix.

Traduce al inglés únicamente el contenido textual del curso.

REGLAS:
- NO traduzcas el nombre del profesor. Es un nombre propio.
- Conserva exactamente IDs, números y precios.
- No inventes información.
- Traduce nombre, categoría, duración, modalidad y descripción.
- Traduce las áreas.
- Traduce temas conservando sus IDs.
- Traduce tareas conservando sus IDs y traduciendo nombre y descripción.
- Devuelve únicamente JSON válido.

CURSO:
${JSON.stringify(curso, null, 2)}

FORMATO:
{
    "nombre_en": "...",
    "categoria_en": "...",
    "duracion_en": "...",
    "modalidad_en": "...",
    "descripcion_en": "...",
    "areas_en": ["..."],
    "temas_en": [
        { "id": 1, "nombre_en": "..." }
    ],
    "tareas_en": [
        { "id": 1, "nombre_en": "...", "descripcion_en": "..." }
    ]
}
`;

        const response = await generarConGemini(prompt, {
            responseMimeType: "application/json",
            thinkingConfig: {
                thinkingLevel: "low"
            }
        });

        if (!response.text) {
            return res.status(500).json({
                error: "La IA no devolvió la traducción."
            });
        }

        const traduccion = JSON.parse(response.text);

        return res.json({
            nombre_en: traduccion.nombre_en || curso.nombre || "",
            categoria_en: traduccion.categoria_en || curso.categoria || "",
            duracion_en: traduccion.duracion_en || curso.duracion || "",
            modalidad_en: traduccion.modalidad_en || curso.modalidad || "",
            descripcion_en: traduccion.descripcion_en || curso.descripcion || "",
            areas_en: Array.isArray(traduccion.areas_en) ? traduccion.areas_en : curso.areas || [],
            temas_en: Array.isArray(traduccion.temas_en) ? traduccion.temas_en : [],
            tareas_en: Array.isArray(traduccion.tareas_en) ? traduccion.tareas_en : []
        });
    } catch (error) {
        console.error("Error traduciendo curso:", error);

        if (error?.status === 429) {
            return res.status(429).json({
                error:
                    "Se alcanzó temporalmente el límite de Gemini. Inténtalo nuevamente."
            });
        }

        if (error?.status === 503) {
            return res.status(503).json({
                error:
                    "El modelo de Gemini está temporalmente saturado. Inténtalo nuevamente en unos segundos."
            });
        }

        if (error?.status === 404) {
            return res.status(404).json({
                error:
                    "El modelo de Gemini no está disponible para esta API key."
            });
        }

        return res.status(500).json({
            error: "No se pudo traducir el curso automáticamente."
        });
    }
});

/* =========================
   TRADUCCIÓN DE PROMOCIONES
========================= */

app.post("/api/traducir-promocion", async (req, res) => {
    try {
        const { promocion } = req.body;

        if (!promocion || typeof promocion !== "object") {
            return res.status(400).json({
                error: "Los datos de la promoción son requeridos."
            });
        }

        // Las promociones actuales tienen principalmente datos estructurados.
        // Solo se traducen los campos de texto que el administrador agregue.
        if (!promocion.descripcion?.trim()) {
            return res.json({
                descripcion_en: ""
            });
        }

        const prompt = `
Eres el traductor de contenido de una plataforma educativa llamada Learnix.

Traduce al inglés la información textual de esta promoción.

REGLAS:
- No cambies IDs, números, porcentajes, precios ni fechas.
- No traduzcas nombres propios.
- Conserva exactamente el significado.
- Devuelve únicamente JSON válido.

PROMOCIÓN:
${JSON.stringify({
    descripcion: promocion.descripcion
}, null, 2)}

FORMATO:
{
    "descripcion_en": "..."
}
`;

        const response = await generarConGemini(prompt, {
            responseMimeType: "application/json",
            thinkingConfig: {
                thinkingLevel: "low"
            }
        });

        if (!response.text) {
            return res.status(500).json({
                error: "La IA no devolvió la traducción de la promoción."
            });
        }

        const traduccion = JSON.parse(response.text);

        return res.json({
            descripcion_en:
                traduccion.descripcion_en || promocion.descripcion || ""
        });
    } catch (error) {
        console.error("Error traduciendo promoción:", error);

        if (error?.status === 429) {
            return res.status(429).json({
                error:
                    "Se alcanzó temporalmente el límite de Gemini. Inténtalo nuevamente."
            });
        }

        if (error?.status === 503) {
            return res.status(503).json({
                error:
                    "El modelo de Gemini está temporalmente saturado. Inténtalo nuevamente en unos segundos."
            });
        }

        if (error?.status === 404) {
            return res.status(404).json({
                error:
                    "El modelo de Gemini no está disponible para esta API key."
            });
        }

        return res.status(500).json({
            error: "No se pudo traducir la promoción automáticamente."
        });
    }
});

/* =========================
   SERVIDOR
========================= */

app.listen(PORT, () => {
    console.log(
        `Servidor de IA ejecutándose en http://localhost:${PORT}`
    );
});