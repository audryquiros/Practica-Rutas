import { obtenerCursos } from "./cursosService";

const AI_API_URL = "http://localhost:3002";

/* =========================
   PREGUNTAS VOCACIONALES
========================= */

export const preguntasVocacionales = [
    {
        id: 1,
        pregunta: "¿Qué actividad te resulta más interesante?",
        preguntaEn: "Which activity sounds most interesting to you?",
        opciones: [
            {
                texto: "Crear aplicaciones y resolver problemas",
                textoEn: "Creating applications and solving problems",
                areas: ["programacion", "logica"]
            },
            {
                texto: "Diseñar interfaces y pensar en la experiencia",
                textoEn: "Designing interfaces and thinking about user experience",
                areas: ["diseno"]
            },
            {
                texto: "Analizar información y encontrar patrones",
                textoEn: "Analyzing information and finding patterns",
                areas: ["datos", "logica"]
            },
            {
                texto: "Crear estrategias para vender o comunicar",
                textoEn: "Creating strategies to sell or communicate",
                areas: ["marketing", "negocios"]
            }
        ]
    },

    {
        id: 2,
        pregunta: "¿Qué tipo de reto prefieres?",
        preguntaEn: "What type of challenge do you prefer?",
        opciones: [
            {
                texto: "Resolver un problema paso a paso",
                textoEn: "Solving a problem step by step",
                areas: ["programacion", "logica"]
            },
            {
                texto: "Crear algo visual y atractivo",
                textoEn: "Creating something visual and attractive",
                areas: ["diseno"]
            },
            {
                texto: "Trabajar con números y datos",
                textoEn: "Working with numbers and data",
                areas: ["datos"]
            },
            {
                texto: "Organizar personas, tareas y objetivos",
                textoEn: "Organizing people, tasks, and goals",
                areas: ["gestion", "negocios"]
            }
        ]
    },

    {
        id: 3,
        pregunta: "¿Qué herramienta te gustaría dominar?",
        preguntaEn: "Which tool would you like to master?",
        opciones: [
            {
                texto: "Lenguajes de programación",
                textoEn: "Programming languages",
                areas: ["programacion"]
            },
            {
                texto: "Herramientas de diseño",
                textoEn: "Design tools",
                areas: ["diseno"]
            },
            {
                texto: "Excel, SQL y herramientas de datos",
                textoEn: "Excel, SQL, and data tools",
                areas: ["datos"]
            },
            {
                texto: "Herramientas para marketing y negocios",
                textoEn: "Marketing and business tools",
                areas: ["marketing", "negocios"]
            }
        ]
    },

    {
        id: 4,
        pregunta: "¿Cómo te gusta aprender?",
        preguntaEn: "How do you like to learn?",
        opciones: [
            {
                texto: "Practicando y construyendo proyectos",
                textoEn: "Practicing and building projects",
                areas: ["programacion"]
            },
            {
                texto: "Experimentando con ideas visuales",
                textoEn: "Experimenting with visual ideas",
                areas: ["diseno"]
            },
            {
                texto: "Analizando ejemplos y resultados",
                textoEn: "Analyzing examples and results",
                areas: ["datos"]
            },
            {
                texto: "Resolviendo casos de la vida real",
                textoEn: "Solving real-world cases",
                areas: ["negocios", "gestion"]
            }
        ]
    },

    {
        id: 5,
        pregunta: "¿Qué resultado te gustaría conseguir?",
        preguntaEn: "What result would you like to achieve?",
        opciones: [
            {
                texto: "Crear una aplicación o página web",
                textoEn: "Creating an application or website",
                areas: ["programacion"]
            },
            {
                texto: "Crear una marca o experiencia digital",
                textoEn: "Creating a brand or digital experience",
                areas: ["diseno", "marketing"]
            },
            {
                texto: "Convertir datos en decisiones",
                textoEn: "Turning data into decisions",
                areas: ["datos"]
            },
            {
                texto: "Gestionar un proyecto o emprendimiento",
                textoEn: "Managing a project or business",
                areas: ["gestion", "negocios"]
            }
        ]
    },

    {
        id: 6,
        pregunta: "¿Qué tema te genera más curiosidad?",
        preguntaEn: "Which topic makes you most curious?",
        opciones: [
            {
                texto: "Tecnología y programación",
                textoEn: "Technology and programming",
                areas: ["programacion"]
            },
            {
                texto: "Creatividad y comunicación visual",
                textoEn: "Creativity and visual communication",
                areas: ["diseno", "marketing"]
            },
            {
                texto: "Datos, seguridad y tecnología",
                textoEn: "Data, security, and technology",
                areas: ["datos", "ciberseguridad"]
            },
            {
                texto: "Negocios, organización y liderazgo",
                textoEn: "Business, organization, and leadership",
                areas: ["negocios", "gestion"]
            }
        ]
    },

    {
        id: 7,
        pregunta: "¿Qué habilidad te gustaría fortalecer?",
        preguntaEn: "Which skill would you like to strengthen?",
        opciones: [
            {
                texto: "Pensamiento lógico",
                textoEn: "Logical thinking",
                areas: ["logica", "programacion"]
            },
            {
                texto: "Creatividad",
                textoEn: "Creativity",
                areas: ["diseno"]
            },
            {
                texto: "Análisis",
                textoEn: "Analysis",
                areas: ["datos"]
            },
            {
                texto: "Comunicación y estrategia",
                textoEn: "Communication and strategy",
                areas: ["marketing", "negocios", "idiomas"]
            }
        ]
    },

    {
        id: 8,
        pregunta: "¿Cuál de estos proyectos te llamaría más la atención?",
        preguntaEn: "Which of these projects would interest you most?",
        opciones: [
            {
                texto: "Desarrollar una aplicación",
                textoEn: "Developing an application",
                areas: ["programacion"]
            },
            {
                texto: "Diseñar una identidad visual",
                textoEn: "Designing a visual identity",
                areas: ["diseno"]
            },
            {
                texto: "Crear un reporte con datos",
                textoEn: "Creating a data report",
                areas: ["datos"]
            },
            {
                texto: "Crear una estrategia para un negocio",
                textoEn: "Creating a strategy for a business",
                areas: ["marketing", "negocios"]
            }
        ]
    }
];

/* =========================
   RECOMENDACIONES CON IA
========================= */

export const obtenerRecomendaciones = async (
    respuestas
) => {
    const cursos = await obtenerCursos();

    const response = await fetch(
        `${AI_API_URL}/api/test-vocacional`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                respuestas,
                cursos
            })
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(
            () => null
        );

        throw new Error(
            errorData?.error ||
                "No se pudieron obtener las recomendaciones de la IA."
        );
    }

    return await response.json();
};