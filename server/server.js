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

        const response =
            await ai.models.generateContent({
                model: "gemini-3.6-flash",

                contents: prompt,

                config: {
                    responseMimeType:
                        "application/json",

                    thinkingConfig: {
                        thinkingLevel: "low"
                    }
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
   SERVIDOR
========================= */

app.listen(PORT, () => {
    console.log(
        `Servidor de IA ejecutándose en http://localhost:${PORT}`
    );
});