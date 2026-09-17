import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const ThemeContext = createContext();

const preferenciasIniciales = {
    tema: "claro",
    idioma: "es",
    tamanioLetra: "normal",
    fuente: "inter",
    altoContraste: false,
    reducirAnimaciones: false
};

const traducciones = {
    es: {
        // Navegación
        inicio: "Inicio",
        misCursos: "Mis cursos",
        administracion: "Administración",
        ayuda: "Ayuda",
        perfil: "Mi perfil",
        configuracion: "Configuración",
        cerrarSesion: "Cerrar sesión",
        iniciarSesion: "Iniciar sesión",
        crearCuenta: "Crear cuenta",

        // General
        cargar: "Cargando...",
        guardar: "Guardar",
        cancelar: "Cancelar",
        editar: "Editar",
        eliminar: "Eliminar",
        continuar: "Continuar",
        volver: "Volver",
        confirmar: "Confirmar",

        // Home
        formacionOnline: "FORMACIÓN ONLINE",
        aprendeAlgoNuevo: "Aprende algo nuevo.",
        exploraCursos:
            "Explora nuestros cursos y desarrolla nuevas habilidades a tu ritmo.",
        cursosDisponibles: "CURSOS DISPONIBLES",
        continuaAprendiendo: "Continúa aprendiendo",
        encuentraCurso: "Encuentra tu próximo curso",
        curso: "curso",
        cursos: "cursos",
        cargandoCursos: "Cargando cursos...",
        noHayCursos: "No hay cursos disponibles",
        todosCursos:
            "Ya estás matriculado en todos los cursos disponibles.",
        noSePudieronCargarCursos:
            "No se pudieron cargar los cursos.",

        // Login
        bienvenidoDeNuevo: "BIENVENIDO DE NUEVO",
        iniciaSesion: "Inicia sesión",
        accesoCuenta:
            "Accede a tu cuenta para continuar con tu aprendizaje.",
        correoElectronico: "Correo electrónico",
        contrasena: "Contraseña",
        completaTodosCampos:
            "Completa todos los campos.",
        correoNoRegistrado:
            "El correo no está registrado.",
        contrasenaIncorrecta:
            "La contraseña es incorrecta.",
        iniciandoSesion: "Iniciando sesión...",
        noTienesCuenta: "¿No tienes una cuenta?",
        cuentaCreada:
            "Cuenta creada correctamente. Ahora puedes iniciar sesión.",
        errorLogin:
            "No se pudo iniciar sesión. Intenta nuevamente.",

        // Registro
        comienzaAprender: "COMIENZA A APRENDER",
        creaTuCuenta: "Crea tu cuenta",
        registroDescripcion:
            "Regístrate para acceder a nuestros cursos y comenzar tu aprendizaje.",
        nombreCompleto: "Nombre completo",
        tuNombre: "Tu nombre",
        minimoCaracteres: "Mínimo 6 caracteres",
        repiteContrasena: "Repite tu contraseña",
        crearCuentaTexto: "Crear cuenta",
        creandoCuenta: "Creando cuenta...",
        yaTienesCuenta: "¿Ya tienes una cuenta?",
        contrasenasNoCoinciden:
            "Las contraseñas no coinciden.",
        correoYaExiste:
            "Ya existe una cuenta con este correo.",
        cuentaNoCreada:
            "No se pudo crear la cuenta. Intenta nuevamente.",

        // Curso
        profesor: "Profesor",
        duracion: "Duración",
        modalidad: "Modalidad",
        inversion: "Inversión",
        matricularCurso: "Matricular curso",
        cursoSeleccionado: "CURSO SELECCIONADO",
        cerrar: "Cerrar",

        // Dashboard
        miEspacio: "MI ESPACIO",
        bienvenida: "Bienvenido",
        consultaProgreso:
            "Consulta tu progreso y continúa con tus cursos.",
        cursosMatriculados: "Cursos matriculados",
        cursosCompletados: "Cursos completados",
        progresoGeneral: "Progreso general",
        misCursosTitulo: "Mis cursos",
        cursosActualmente:
            "Estos son los cursos en los que estás matriculado actualmente.",
        cargandoTusCursos:
            "Cargando tus cursos...",
        noSePudieronCargarTusCursos:
            "No se pudieron cargar tus cursos.",
        aunNoCursos: "Aún no tienes cursos",
        exploraOferta:
            "Explora nuestra oferta académica y encuentra un curso para comenzar.",
        progreso: "Progreso",
        activo: "Activo",
        verCurso: "Ver curso",

        // Perfil
        miCuenta: "MI CUENTA",
        consultaActualiza:
            "Consulta y actualiza la información de tu cuenta.",
        estudiante: "ESTUDIANTE",
        administrador: "ADMINISTRADOR",
        informacionPersonal: "INFORMACIÓN PERSONAL",
        datosCuenta: "Datos de la cuenta",
        editarInformacion: "Editar información",
        idUsuario: "ID de usuario",
        tipoCuenta: "Tipo de cuenta",
        guardarCambios: "Guardar cambios",
        guardando: "Guardando...",
        informacionActualizada:
            "La información se actualizó correctamente.",
        otroUsuarioCorreo:
            "Ya existe otro usuario con ese correo.",
        errorActualizar:
            "No se pudo actualizar la información.",

        // Configuración
        preferencias: "Preferencias",
        personalizaLearnix:
            "Personaliza Learnix según tus preferencias visuales, de idioma y accesibilidad.",
        idioma: "IDIOMA",
        idiomaPlataforma: "Idioma de la plataforma",
        seleccionaIdioma:
            "Selecciona el idioma que prefieres utilizar en la interfaz.",
        espanol: "Español",
        ingles: "English",
        apariencia: "APARIENCIA",
        tema: "Tema",
        cambiaColores:
            "Cambia los colores de la interfaz según tu preferencia.",
        claro: "Claro",
        interfazClara: "Interfaz clara",
        oscuro: "Oscuro",
        menorLuminosidad: "Menor luminosidad",
        lavanda: "Lavanda",
        tonosSuaves: "Tonos suaves",
        azul: "Azul",
        tonosFrios: "Tonos fríos",
        accesibilidad: "ACCESIBILIDAD",
        tamanoLetra: "Tamaño de letra",
        ajustaTamano:
            "Ajusta el tamaño general del texto para facilitar la lectura.",
        normal: "Normal",
        grande: "Grande",
        muyGrande: "Muy grande",
        tipografia: "TIPOGRAFÍA",
        fuente: "Fuente",
        seleccionaFuente:
            "Selecciona una fuente que facilite tu lectura.",
        modernaLimpia: "Moderna y limpia",
        simpleFamiliar: "Simple y familiar",
        altaLegibilidad: "Alta legibilidad",
        estiloSerif: "Estilo serif",
        opcionesAccesibilidad:
            "Opciones de accesibilidad",
        activaOpciones:
            "Activa opciones adicionales para adaptar la experiencia.",
        altoContraste: "Alto contraste",
        aumentaDiferencia:
            "Aumenta la diferencia entre fondos, textos y elementos.",
        reducirAnimaciones: "Reducir animaciones",
        reduceTransiciones:
            "Reduce las transiciones y movimientos de la interfaz.",
        preferenciasGuardadas:
            "Tus preferencias se guardan automáticamente.",
        restablecerPreferencias:
            "Restablecer preferencias",

        // Pago
        matricula: "MATRÍCULA",
        completarMatricula: "Completar matrícula",
        revisaInformacion:
            "Revisa la información y completa el proceso de inscripción.",
        numeroTarjeta: "Número de tarjeta",
        vencimiento: "Vencimiento",
        cvv: "CVV",
        completarDatosPago:
            "Completa todos los datos de pago.",
        necesitasSesion:
            "Necesitas iniciar sesión para matricularte.",
        yaMatriculado:
            "Ya estás matriculado en este curso.",
        procesandoMatricula:
            "Procesando matrícula...",
        confirmarMatricula:
            "Confirmar matrícula",
        noSePudoCompletar:
            "No se pudo completar la matrícula.",

        // Administración
        panelAdministracion: "Panel de administración",
        gestionaOferta:
            "Gestiona la oferta académica y agrega nuevos cursos a la plataforma.",
        nuevoCurso: "NUEVO CURSO",
        agregarCurso: "Agregar curso",
        informacionNuevoCurso:
            "Completa la información del nuevo curso para publicarlo en Learnix.",
        nombreCurso: "Nombre del curso",
        categoria: "Categoría",
        precio: "Precio",
        descripcion: "Descripción",
        descripcionCurso:
            "Describe brevemente el contenido del curso.",
        temasCurso: "Temas del curso",
        unTemaLinea: "Escribe un tema por línea.",
        tareas: "Tareas",
        unaTareaLinea: "Escribe una tarea por línea.",
        publicarCurso: "Publicar curso",
        publicando: "Publicando...",
        cursoCreado:
            "El curso se creó correctamente.",
        errorCrearCurso:
            "No se pudo crear el curso. Intenta nuevamente.",

        // Ayuda
        centroAyuda: "CENTRO DE AYUDA",
        comoPodemosAyudarte:
            "¿Cómo podemos ayudarte?",
        encuentraRespuestas:
            "Encuentra respuestas a las preguntas más frecuentes sobre Learnix.",
        preguntasFrecuentes: "Preguntas frecuentes",

        // 404
        paginaNoEncontrada: "Página no encontrada",
        paginaNoExiste:
            "La página que buscas no existe o fue movida.",
        volverInicio: "Volver al inicio"
    },

    en: {
        // Navigation
        inicio: "Home",
        misCursos: "My courses",
        administracion: "Administration",
        ayuda: "Help",
        perfil: "My profile",
        configuracion: "Settings",
        cerrarSesion: "Log out",
        iniciarSesion: "Log in",
        crearCuenta: "Create account",

        // General
        cargar: "Loading...",
        guardar: "Save",
        cancelar: "Cancel",
        editar: "Edit",
        eliminar: "Delete",
        continuar: "Continue",
        volver: "Back",
        confirmar: "Confirm",

        // Home
        formacionOnline: "ONLINE LEARNING",
        aprendeAlgoNuevo: "Learn something new.",
        exploraCursos:
            "Explore our courses and develop new skills at your own pace.",
        cursosDisponibles: "AVAILABLE COURSES",
        continuaAprendiendo: "Keep learning",
        encuentraCurso: "Find your next course",
        curso: "course",
        cursos: "courses",
        cargandoCursos: "Loading courses...",
        noHayCursos: "No courses available",
        todosCursos:
            "You are already enrolled in all available courses.",
        noSePudieronCargarCursos:
            "The courses could not be loaded.",

        // Login
        bienvenidoDeNuevo: "WELCOME BACK",
        iniciaSesion: "Log in",
        accesoCuenta:
            "Access your account to continue your learning.",
        correoElectronico: "Email address",
        contrasena: "Password",
        completaTodosCampos:
            "Complete all fields.",
        correoNoRegistrado:
            "The email is not registered.",
        contrasenaIncorrecta:
            "The password is incorrect.",
        iniciandoSesion: "Logging in...",
        noTienesCuenta: "Don't have an account?",
        cuentaCreada:
            "Account created successfully. You can now log in.",
        errorLogin:
            "Could not log in. Please try again.",

        // Registration
        comienzaAprender: "START LEARNING",
        creaTuCuenta: "Create your account",
        registroDescripcion:
            "Sign up to access our courses and start your learning journey.",
        nombreCompleto: "Full name",
        tuNombre: "Your name",
        minimoCaracteres: "Minimum 6 characters",
        repiteContrasena: "Repeat your password",
        crearCuentaTexto: "Create account",
        creandoCuenta: "Creating account...",
        yaTienesCuenta: "Already have an account?",
        contrasenasNoCoinciden:
            "Passwords do not match.",
        correoYaExiste:
            "An account with this email already exists.",
        cuentaNoCreada:
            "Could not create the account. Please try again.",

        // Course
        profesor: "Instructor",
        duracion: "Duration",
        modalidad: "Format",
        inversion: "Price",
        matricularCurso: "Enroll in course",
        cursoSeleccionado: "SELECTED COURSE",
        cerrar: "Close",

        // Dashboard
        miEspacio: "MY SPACE",
        bienvenida: "Welcome",
        consultaProgreso:
            "Check your progress and continue with your courses.",
        cursosMatriculados: "Enrolled courses",
        cursosCompletados: "Completed courses",
        progresoGeneral: "Overall progress",
        misCursosTitulo: "My courses",
        cursosActualmente:
            "These are the courses you are currently enrolled in.",
        cargandoTusCursos:
            "Loading your courses...",
        noSePudieronCargarTusCursos:
            "Your courses could not be loaded.",
        aunNoCursos: "You don't have any courses yet",
        exploraOferta:
            "Explore our course catalog and find one to get started.",
        progreso: "Progress",
        activo: "Active",
        verCurso: "View course",

        // Profile
        miCuenta: "MY ACCOUNT",
        consultaActualiza:
            "View and update your account information.",
        estudiante: "STUDENT",
        administrador: "ADMINISTRATOR",
        informacionPersonal: "PERSONAL INFORMATION",
        datosCuenta: "Account details",
        editarInformacion: "Edit information",
        idUsuario: "User ID",
        tipoCuenta: "Account type",
        guardarCambios: "Save changes",
        guardando: "Saving...",
        informacionActualizada:
            "Your information was updated successfully.",
        otroUsuarioCorreo:
            "Another user already has this email.",
        errorActualizar:
            "The information could not be updated.",

        // Settings
        preferencias: "Preferences",
        personalizaLearnix:
            "Customize Learnix according to your visual, language and accessibility preferences.",
        idioma: "LANGUAGE",
        idiomaPlataforma: "Platform language",
        seleccionaIdioma:
            "Select the language you prefer to use in the interface.",
        espanol: "Español",
        ingles: "English",
        apariencia: "APPEARANCE",
        tema: "Theme",
        cambiaColores:
            "Change the interface colors according to your preference.",
        claro: "Light",
        interfazClara: "Light interface",
        oscuro: "Dark",
        menorLuminosidad: "Lower brightness",
        lavanda: "Lavender",
        tonosSuaves: "Soft tones",
        azul: "Blue",
        tonosFrios: "Cool tones",
        accesibilidad: "ACCESSIBILITY",
        tamanoLetra: "Font size",
        ajustaTamano:
            "Adjust the general text size to make reading easier.",
        normal: "Normal",
        grande: "Large",
        muyGrande: "Very large",
        tipografia: "TYPOGRAPHY",
        fuente: "Font",
        seleccionaFuente:
            "Select a font that makes reading easier.",
        modernaLimpia: "Modern and clean",
        simpleFamiliar: "Simple and familiar",
        altaLegibilidad: "Highly readable",
        estiloSerif: "Serif style",
        opcionesAccesibilidad:
            "Accessibility options",
        activaOpciones:
            "Enable additional options to adapt your experience.",
        altoContraste: "High contrast",
        aumentaDiferencia:
            "Increase the difference between backgrounds, text and elements.",
        reducirAnimaciones: "Reduce animations",
        reduceTransiciones:
            "Reduce interface transitions and movement.",
        preferenciasGuardadas:
            "Your preferences are saved automatically.",
        restablecerPreferencias:
            "Reset preferences",

        // Payment
        matricula: "ENROLLMENT",
        completarMatricula: "Complete enrollment",
        revisaInformacion:
            "Review the information and complete the enrollment process.",
        numeroTarjeta: "Card number",
        vencimiento: "Expiration date",
        cvv: "CVV",
        completarDatosPago:
            "Complete all payment fields.",
        necesitasSesion:
            "You need to log in to enroll.",
        yaMatriculado:
            "You are already enrolled in this course.",
        procesandoMatricula:
            "Processing enrollment...",
        confirmarMatricula:
            "Confirm enrollment",
        noSePudoCompletar:
            "The enrollment could not be completed.",

        // Administration
        panelAdministracion: "Administration panel",
        gestionaOferta:
            "Manage the course catalog and add new courses to the platform.",
        nuevoCurso: "NEW COURSE",
        agregarCurso: "Add course",
        informacionNuevoCurso:
            "Complete the information for the new course to publish it on Learnix.",
        nombreCurso: "Course name",
        categoria: "Category",
        precio: "Price",
        descripcion: "Description",
        descripcionCurso:
            "Briefly describe the course content.",
        temasCurso: "Course topics",
        unTemaLinea: "Write one topic per line.",
        tareas: "Assignments",
        unaTareaLinea: "Write one assignment per line.",
        publicarCurso: "Publish course",
        publicando: "Publishing...",
        cursoCreado:
            "The course was created successfully.",
        errorCrearCurso:
            "The course could not be created. Please try again.",

        // Help
        centroAyuda: "HELP CENTER",
        comoPodemosAyudarte:
            "How can we help you?",
        encuentraRespuestas:
            "Find answers to frequently asked questions about Learnix.",
        preguntasFrecuentes: "Frequently asked questions",

        // 404
        paginaNoEncontrada: "Page not found",
        paginaNoExiste:
            "The page you are looking for does not exist or has been moved.",
        volverInicio: "Back to home"
    }
};

export function ThemeProvider({ children }) {
    const [preferencias, setPreferencias] = useState(() => {
        const guardadas =
            localStorage.getItem("preferenciasLearnix");

        if (!guardadas) {
            return preferenciasIniciales;
        }

        try {
            return {
                ...preferenciasIniciales,
                ...JSON.parse(guardadas)
            };
        } catch {
            return preferenciasIniciales;
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "preferenciasLearnix",
            JSON.stringify(preferencias)
        );

        const root = document.documentElement;

        root.dataset.tema = preferencias.tema;
        root.dataset.tamanio = preferencias.tamanioLetra;
        root.dataset.fuente = preferencias.fuente;

        root.dataset.contraste =
            preferencias.altoContraste
                ? "alto"
                : "normal";

        root.dataset.animaciones =
            preferencias.reducirAnimaciones
                ? "reducidas"
                : "normales";

        root.lang = preferencias.idioma;
    }, [preferencias]);

    const cambiarPreferencia = (
        propiedad,
        valor
    ) => {
        setPreferencias((actuales) => ({
            ...actuales,
            [propiedad]: valor
        }));
    };

    const restablecerPreferencias = () => {
        setPreferencias({
            ...preferenciasIniciales
        });
    };

    const t = (clave) => {
        return (
            traducciones[
                preferencias.idioma
            ]?.[clave] || clave
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                preferencias,
                cambiarPreferencia,
                restablecerPreferencias,
                t
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}