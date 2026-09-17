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
        /* =========================
           NAVBAR
        ========================= */

        inicio: "Inicio",
        misCursos: "Mis cursos",
        administracion: "Administración",
        ayuda: "Ayuda",
        perfil: "Mi perfil",
        configuracion: "Configuración",
        usuarios: "Usuarios",
        cerrarSesion: "Cerrar sesión",
        iniciarSesion: "Iniciar sesión",
        crearCuenta: "Crear cuenta",

        /* =========================
           HOME
        ========================= */

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

        /* =========================
           LOGIN
        ========================= */

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
        iniciandoSesion:
            "Iniciando sesión...",
        errorLogin:
            "No se pudo iniciar sesión. Intenta nuevamente.",
        cuentaCreada:
            "Cuenta creada correctamente. Ahora puedes iniciar sesión.",
        noTienesCuenta:
            "¿No tienes una cuenta?",

        /* =========================
           REGISTRO
        ========================= */

        comienzaAprender: "COMIENZA A APRENDER",
        creaTuCuenta: "Crea tu cuenta",
        registroDescripcion:
            "Regístrate para comenzar a explorar nuestros cursos.",
        nombreCompleto: "Nombre completo",
        tuNombre: "Tu nombre",
        minimoCaracteres:
            "Mínimo 6 caracteres",
        repiteContrasena:
            "Repite la contraseña",
        contrasenasNoCoinciden:
            "Las contraseñas no coinciden.",
        correoYaExiste:
            "Ya existe una cuenta con este correo.",
        cuentaNoCreada:
            "No se pudo crear la cuenta. Intenta nuevamente.",
        creandoCuenta:
            "Creando cuenta...",
        crearCuentaTexto:
            "Crear cuenta",
        yaTienesCuenta:
            "¿Ya tienes una cuenta?",

        /* =========================
           DASHBOARD
        ========================= */

        miEspacio: "Mi espacio",
        bienvenida: "Bienvenido",
        cursosMatriculados: "Cursos matriculados",
        cursosActualmente: "Cursos actualmente",
        cursosCompletados: "Cursos completados",
        progresoGeneral: "Progreso general",
        progreso: "Progreso",
        consultaProgreso:
            "Consulta tu progreso y continúa con tus cursos.",
        cargandoTusCursos:
            "Cargando tus cursos...",
        noSePudieronCargarTusCursos:
            "No se pudieron cargar tus cursos.",
        aunNoCursos:
            "Aún no tienes cursos matriculados.",
        exploraOferta:
            "Explora nuestra oferta de cursos para comenzar a aprender.",
        verCurso: "Ver curso",
        yaMatriculado: "Ya estás matriculado",
        misCursosTitulo: "Mis cursos",

        /* =========================
           PERFIL
        ========================= */

        miCuenta: "Mi cuenta",
        informacionPersonal:
            "Información personal",
        datosCuenta:
            "Datos de tu cuenta",
        editarInformacion:
            "Editar información",
        informacionActualizada:
            "Información actualizada correctamente.",
        errorActualizar:
            "No se pudo actualizar la información.",
        estudiante: "Estudiante",
        administrador: "Administrador",
        tipoCuenta: "Tipo de cuenta",
        idUsuario: "ID de usuario",
        nombre: "Nombre",
        correo: "Correo",
        consultaActualiza:
            "Consulta y actualiza tu información personal.",
        otroUsuarioCorreo:
            "Correo de usuario",
        guardarCambios:
            "Guardar cambios",
        guardando: "Guardando...",

        /* =========================
           CONFIGURACIÓN
        ========================= */

        preferencias: "Preferencias",
        personalizaLearnix:
            "Personaliza Learnix según tus preferencias.",
        idioma: "Idioma",
        idiomaPlataforma:
            "Idioma de la plataforma",
        seleccionaIdioma:
            "Selecciona el idioma que deseas utilizar.",
        espanol: "Español",
        ingles: "Inglés",

        apariencia:
            "Apariencia",
        tema: "Tema",
        cambiaColores:
            "Cambia los colores de la interfaz.",
        claro: "Claro",
        oscuro: "Oscuro",
        lavanda: "Lavanda",
        azul: "Azul",
        interfazClara:
            "Interfaz clara y luminosa.",
        menorLuminosidad:
            "Menor luminosidad y mayor contraste visual.",
        tonosSuaves:
            "Tonos suaves y relajados.",
        tonosFrios:
            "Tonos fríos y profesionales.",

        tamanoLetra: "Tamaño de letra",
        ajustaTamano:
            "Ajusta el tamaño del texto según tus necesidades.",
        normal: "Normal",
        grande: "Grande",
        muyGrande: "Muy grande",

        fuente: "Fuente",
        tipografia: "Tipografía",
        seleccionaFuente:
            "Selecciona la fuente que deseas utilizar.",
        estiloSerif:
            "Estilo serif clásico.",
        modernaLimpia:
            "Moderna y limpia.",
        simpleFamiliar:
            "Simple y familiar.",

        accesibilidad: "Accesibilidad",
        opcionesAccesibilidad:
            "Opciones de accesibilidad",
        altoContraste: "Alto contraste",
        aumentaDiferencia:
            "Aumenta la diferencia entre colores para mejorar la legibilidad.",
        reducirAnimaciones:
            "Reducir animaciones",
        reduceTransiciones:
            "Reduce las transiciones y animaciones de la interfaz.",
        altaLegibilidad:
            "Alta legibilidad",

        restablecerPreferencias:
            "Restablecer preferencias",
        preferenciasGuardadas:
            "Preferencias guardadas correctamente.",

        /* =========================
           ADMINISTRACIÓN
        ========================= */

        panelAdministracion:
            "Panel de administración",
        gestionaOferta:
            "Gestiona la oferta académica de Learnix.",
        agregarCurso:
            "Agregar curso",
        nuevoCurso:
            "Nuevo curso",
        informacionNuevoCurso:
            "Información del nuevo curso",
        nombreCurso:
            "Nombre del curso",
        descripcion:
            "Descripción",
        descripcionCurso:
            "Descripción del curso",
        categoria:
            "Categoría",
        profesor:
            "Profesor",
        duracion:
            "Duración",
        modalidad:
            "Modalidad",
        precio:
            "Precio",
        publicarCurso:
            "Publicar curso",
        publicando:
            "Publicando...",
        cursoCreado:
            "Curso creado correctamente.",
        errorCrearCurso:
            "No se pudo crear el curso.",
        temasCurso:
            "Temas del curso",
        tareas:
            "Tareas",

        /* =========================
           PAGO
        ========================= */

        cursoSeleccionado:
            "Curso seleccionado",
        completarDatosPago:
            "Completa los datos de pago",
        numeroTarjeta:
            "Número de tarjeta",
        cvv:
            "CVV",
        revisaInformacion:
            "Revisa la información antes de completar la matrícula.",
        completarMatricula:
            "Completar matrícula",
        confirmarMatricula:
            "Confirmar matrícula",
        procesandoMatricula:
            "Procesando matrícula...",
        matricula:
            "Matrícula",
        noSePudoCompletar:
            "No se pudo completar la matrícula.",
        necesitasSesion:
            "Necesitas iniciar sesión para matricularte.",

        /* =========================
           OTROS
        ========================= */

        cancelar: "Cancelar",
        cargar: "Cargar",
        vencimiento: "Vencimiento",
        unaTareaLinea:
            "Una tarea pendiente.",
        unTemaLinea:
            "Un tema del curso.",
        activaOpciones:
            "Activa las opciones que necesites."
    },

    en: {
        /* =========================
           NAVBAR
        ========================= */

        inicio: "Home",
        misCursos: "My courses",
        administracion: "Administration",
        ayuda: "Help",
        perfil: "My profile",
        configuracion: "Settings",
        usuarios: "Users",
        cerrarSesion: "Log out",
        iniciarSesion: "Log in",
        crearCuenta: "Create account",

        /* =========================
           HOME
        ========================= */

        formacionOnline: "ONLINE LEARNING",
        aprendeAlgoNuevo: "Learn something new.",
        exploraCursos:
            "Explore our courses and develop new skills at your own pace.",
        cursosDisponibles: "AVAILABLE COURSES",
        continuaAprendiendo: "Continue learning",
        encuentraCurso: "Find your next course",
        curso: "course",
        cursos: "courses",
        cargandoCursos: "Loading courses...",
        noHayCursos: "No courses available",
        todosCursos:
            "You are already enrolled in all available courses.",
        noSePudieronCargarCursos:
            "Courses could not be loaded.",

        /* =========================
           LOGIN
        ========================= */

        bienvenidoDeNuevo: "WELCOME BACK",
        iniciaSesion: "Log in",
        accesoCuenta:
            "Access your account to continue your learning.",
        correoElectronico: "Email address",
        contrasena: "Password",
        completaTodosCampos:
            "Complete all fields.",
        correoNoRegistrado:
            "This email is not registered.",
        contrasenaIncorrecta:
            "The password is incorrect.",
        iniciandoSesion:
            "Logging in...",
        errorLogin:
            "Could not log in. Please try again.",
        cuentaCreada:
            "Account created successfully. You can now log in.",
        noTienesCuenta:
            "Don't have an account?",

        /* =========================
           REGISTRO
        ========================= */

        comienzaAprender: "START LEARNING",
        creaTuCuenta: "Create your account",
        registroDescripcion:
            "Sign up to start exploring our courses.",
        nombreCompleto: "Full name",
        tuNombre: "Your name",
        minimoCaracteres:
            "Minimum 6 characters",
        repiteContrasena:
            "Repeat password",
        contrasenasNoCoinciden:
            "Passwords do not match.",
        correoYaExiste:
            "An account with this email already exists.",
        cuentaNoCreada:
            "The account could not be created. Please try again.",
        creandoCuenta:
            "Creating account...",
        crearCuentaTexto:
            "Create account",
        yaTienesCuenta:
            "Already have an account?",

        /* =========================
           DASHBOARD
        ========================= */

        miEspacio: "My space",
        bienvenida: "Welcome",
        cursosMatriculados: "Enrolled courses",
        cursosActualmente: "Current courses",
        cursosCompletados: "Completed courses",
        progresoGeneral: "Overall progress",
        progreso: "Progress",
        consultaProgreso:
            "Check your progress and continue with your courses.",
        cargandoTusCursos:
            "Loading your courses...",
        noSePudieronCargarTusCursos:
            "Your courses could not be loaded.",
        aunNoCursos:
            "You do not have any enrolled courses yet.",
        exploraOferta:
            "Explore our course offering to start learning.",
        verCurso: "View course",
        yaMatriculado: "Already enrolled",
        misCursosTitulo: "My courses",

        /* =========================
           PROFILE
        ========================= */

        miCuenta: "My account",
        informacionPersonal:
            "Personal information",
        datosCuenta:
            "Account information",
        editarInformacion:
            "Edit information",
        informacionActualizada:
            "Information updated successfully.",
        errorActualizar:
            "The information could not be updated.",
        estudiante: "Student",
        administrador: "Administrator",
        tipoCuenta: "Account type",
        idUsuario: "User ID",
        nombre: "Name",
        correo: "Email",
        consultaActualiza:
            "View and update your personal information.",
        otroUsuarioCorreo:
            "User email",
        guardarCambios:
            "Save changes",
        guardando: "Saving...",

        /* =========================
           SETTINGS
        ========================= */

        preferencias: "Preferences",
        personalizaLearnix:
            "Customize Learnix according to your preferences.",
        idioma: "Language",
        idiomaPlataforma:
            "Platform language",
        seleccionaIdioma:
            "Select the language you want to use.",
        espanol: "Spanish",
        ingles: "English",

        apariencia:
            "Appearance",
        tema: "Theme",
        cambiaColores:
            "Change the interface colors.",
        claro: "Light",
        oscuro: "Dark",
        lavanda: "Lavender",
        azul: "Blue",
        interfazClara:
            "Clear and bright interface.",
        menorLuminosidad:
            "Lower brightness and higher visual contrast.",
        tonosSuaves:
            "Soft and relaxing tones.",
        tonosFrios:
            "Cool and professional tones.",

        tamanoLetra: "Font size",
        ajustaTamano:
            "Adjust the text size according to your needs.",
        normal: "Normal",
        grande: "Large",
        muyGrande: "Extra large",

        fuente: "Font",
        tipografia: "Typography",
        seleccionaFuente:
            "Select the font you want to use.",
        estiloSerif:
            "Classic serif style.",
        modernaLimpia:
            "Modern and clean.",
        simpleFamiliar:
            "Simple and familiar.",

        accesibilidad: "Accessibility",
        opcionesAccesibilidad:
            "Accessibility options",
        altoContraste: "High contrast",
        aumentaDiferencia:
            "Increase color differences to improve readability.",
        reducirAnimaciones:
            "Reduce animations",
        reduceTransiciones:
            "Reduce interface transitions and animations.",
        altaLegibilidad:
            "High readability",

        restablecerPreferencias:
            "Reset preferences",
        preferenciasGuardadas:
            "Preferences saved successfully.",

        /* =========================
           ADMINISTRATION
        ========================= */

        panelAdministracion:
            "Administration panel",
        gestionaOferta:
            "Manage Learnix's academic course offering.",
        agregarCurso:
            "Add course",
        nuevoCurso:
            "New course",
        informacionNuevoCurso:
            "New course information",
        nombreCurso:
            "Course name",
        descripcion:
            "Description",
        descripcionCurso:
            "Course description",
        categoria:
            "Category",
        profesor:
            "Instructor",
        duracion:
            "Duration",
        modalidad:
            "Modality",
        precio:
            "Price",
        publicarCurso:
            "Publish course",
        publicando:
            "Publishing...",
        cursoCreado:
            "Course created successfully.",
        errorCrearCurso:
            "The course could not be created.",
        temasCurso:
            "Course topics",
        tareas:
            "Tasks",

        /* =========================
           PAYMENT
        ========================= */

        cursoSeleccionado:
            "Selected course",
        completarDatosPago:
            "Complete payment information",
        numeroTarjeta:
            "Card number",
        cvv:
            "CVV",
        revisaInformacion:
            "Review the information before completing your enrollment.",
        completarMatricula:
            "Complete enrollment",
        confirmarMatricula:
            "Confirm enrollment",
        procesandoMatricula:
            "Processing enrollment...",
        matricula:
            "Enrollment",
        noSePudoCompletar:
            "The enrollment could not be completed.",
        necesitasSesion:
            "You need to log in to enroll.",

        /* =========================
           OTHER
        ========================= */

        cancelar: "Cancel",
        cargar: "Load",
        vencimiento: "Due date",
        unaTareaLinea:
            "A pending task.",
        unTemaLinea:
            "A course topic.",
        activaOpciones:
            "Enable the options you need."
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

        const root =
            document.documentElement;

        root.dataset.tema =
            preferencias.tema;

        root.dataset.tamanio =
            preferencias.tamanioLetra;

        root.dataset.fuente =
            preferencias.fuente;

        root.dataset.contraste =
            preferencias.altoContraste
                ? "alto"
                : "normal";

        root.dataset.animaciones =
            preferencias.reducirAnimaciones
                ? "reducidas"
                : "normales";

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