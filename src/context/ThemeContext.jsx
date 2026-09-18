import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const ThemeContext = createContext();

const preferenciasIniciales = {
    tema: "oscuro",
    idioma: "es",
    tamanioLetra: "normal",
    fuente: "inter",
    altoContraste: false,
    reducirAnimaciones: false
};

const traducciones = {
    es: {
        inicio: "Inicio",
        inicioPromocion: "Inicio",
        misCursos: "Mis cursos",
        administracion: "Administración",
        ayuda: "Ayuda",
        perfil: "Perfil",
        configuracion: "Configuración",
        usuarios: "Usuarios",
        cerrarSesion: "Cerrar sesión",
        iniciarSesion: "Iniciar sesión",
        crearCuenta: "Crear cuenta",
        testVocacional: "Test vocacional",

        bienvenidoDeNuevo: "Bienvenido de nuevo",
        accesoCuenta: "Accede a tu cuenta para continuar aprendiendo.",
        correoElectronico: "Correo electrónico",
        contrasena: "Contraseña",
        completaTodosCampos: "Completa todos los campos.",
        correoNoRegistrado: "El correo no está registrado.",
        contrasenaIncorrecta: "La contraseña es incorrecta.",
        errorLogin: "No se pudo iniciar sesión.",
        iniciandoSesion: "Iniciando sesión...",
        noTienesCuenta: "¿No tienes una cuenta?",

        comienzaAprender: "Comienza a aprender",
        creaTuCuenta: "Crea tu cuenta",
        registroDescripcion:
            "Regístrate para comenzar a explorar nuestros cursos.",
        nombreCompleto: "Nombre completo",
        tuNombre: "Tu nombre",
        minimoCaracteres: "Mínimo 6 caracteres",
        repiteContrasena: "Repite la contraseña",
        contrasenasNoCoinciden:
            "Las contraseñas no coinciden.",
        correoYaExiste: "El correo ya está registrado.",
        cuentaNoCreada: "No se pudo crear la cuenta.",
        creandoCuenta: "Creando cuenta...",
        crearCuentaTexto: "Crear cuenta",
        yaTienesCuenta: "¿Ya tienes una cuenta?",
        cuentaCreada:
            "Cuenta creada correctamente. Ahora puedes iniciar sesión.",


        configuracion: "Configuración",
        aprendeAlgoNuevo: "Aprende algo nuevo",
        formacionOnline: "Formación online",
        encuentraCurso: "Encuentra el curso ideal para ti",
        exploraCursos: "Explora nuestra oferta de cursos y encuentra una opción para seguir desarrollándote.",
        todosCursos: "Todos los cursos",
        noHayCursos: "No hay cursos disponibles",
        cargandoCursos: "Cargando cursos...",
        noSePudieronCargarCursos: "No se pudieron cargar los cursos.",
        curso: "curso",
        deDescuento: "de descuento",

        consultaProgreso: "Revisa tu progreso y continúa aprendiendo con tus cursos.",
        consultaActualiza: "Consulta y actualiza tu información personal.",
        continuaAprendiendo: "Continúa aprendiendo con tus cursos.",
        estado: "Estado",
        cargandoTusCursos: "Cargando tus cursos...",
        cursosActualmente: "Continúa aprendiendo con los cursos en los que estás matriculado.",
        aunNoCursos: "Aún no tienes cursos",
        exploraOferta: "Explora nuestra oferta y encuentra un curso para comenzar.",
        noSePudieronCargarTusCursos: "No se pudieron cargar tus cursos.",

        miCuenta: "Mi cuenta",
        datosCuenta: "Datos de la cuenta",
        informacionPersonal: "Información personal",
        idUsuario: "ID de usuario",
        tipoCuenta: "Tipo de cuenta",
        estudiante: "Estudiante",
        administrador: "Administrador",
        editarInformacion: "Editar información",
        guardarCambios: "Guardar cambios",
        guardando: "Guardando...",
        traduciendoGuardando: "Traduciendo y guardando...",
        informacionActualizada: "Información actualizada correctamente.",
        errorActualizar: "No se pudo actualizar la información.",
        otroUsuarioCorreo: "Ya existe otro usuario con ese correo.",

        cargando: "Cargando...",
        completarDatosPago: "Completa los datos de pago",
        completarMatricula: "Completa tu matrícula",
        confirmarMatricula: "Confirmar matrícula",
        cvv: "CVV",
        matricula: "Matrícula",
        necesitasSesion: "Necesitas iniciar sesión para continuar.",
        noSePudoCompletar: "No se pudo completar la matrícula.",
        procesandoMatricula: "Procesando matrícula...",
        revisaInformacion: "Revisa la información antes de completar tu matrícula.",
        errorGuardarProgreso: "No se pudo guardar el progreso.",

        preferencias: "Preferencias",
        personalizaLearnix:
            "Personaliza tu experiencia en Learnix.",

        idioma: "Idioma",
        idiomaPlataforma: "Idioma de la plataforma",
        cambiarMoneda: "Cambiar moneda",
        monedaColones: "Colones",
        monedaDolares: "Dólares",
        seleccionaIdioma:
            "Selecciona el idioma que quieres utilizar.",
        espanol: "Español",
        ingles: "Inglés",

        apariencia: "Apariencia",
        tema: "Tema",
        cambiaColores:
            "Cambia la apariencia visual de la plataforma.",
        claro: "Claro",
        oscuro: "Oscuro",
        lavanda: "Lavanda",
        azul: "Azul",
        interfazClara: "Interfaz clara",
        menorLuminosidad: "Menor luminosidad",
        tonosSuaves: "Tonos suaves",
        tonosFrios: "Tonos fríos",

        accesibilidad: "Accesibilidad",
        tamanoLetra: "Tamaño de letra",
        ajustaTamano:
            "Ajusta el tamaño del texto según tus necesidades.",
        "muy-pequena": "Muy pequeña",
        pequena: "Pequeña",
        normal: "Normal",
        grande: "Grande",
        "muy-grande": "Muy grande",
        tamanoActual: "Tamaño actual",

        tipografia: "Tipografía",
        fuente: "Fuente",
        seleccionaFuente:
            "Selecciona la fuente que prefieras.",
        modernaLimpia: "Moderna y limpia",
        simpleFamiliar: "Simple y familiar",
        altaLegibilidad: "Alta legibilidad",
        estiloSerif: "Estilo serif",

        opcionesAccesibilidad:
            "Opciones de accesibilidad",
        activaOpciones:
            "Activa las opciones que necesites.",
        altoContraste: "Alto contraste",
        aumentaDiferencia:
            "Aumenta la diferencia entre colores.",
        reducirAnimaciones: "Reducir animaciones",
        reduceTransiciones:
            "Reduce las transiciones y animaciones.",

        preferenciasGuardadas:
            "Las preferencias se guardan automáticamente.",
        restablecerPreferencias:
            "Restablecer preferencias",

        cursosDisponibles: "Cursos disponibles",
        sigueAprendiendo: "Sigue aprendiendo",
        cursos: "cursos",
        profesor: "Profesor",
        instructor: "Instructor",
        duracion: "Duración",
        modalidad: "Modalidad",
        inversion: "Inversión",
        verInformacion: "Ver información",
        descuento: "descuento",
        ahorras: "Ahorras",

        matricularCurso: "Matricular curso",
        cursoSeleccionado: "Curso seleccionado",
        inscripcion: "Inscripción",
        completarInscripcion: "Completa tu inscripción",
        revisarInformacion:
            "Revisa la información antes de completar tu inscripción.",
        numeroTarjeta: "Número de tarjeta",
        vencimiento: "Vencimiento",
        confirmarInscripcion:
            "Confirmar inscripción",
        cancelar: "Cancelar",
        volver: "Volver",

        miEspacio: "Mi espacio",
        bienvenida: "Bienvenido",
        progresoCursos:
            "Revisa tu progreso y continúa con tus cursos.",
        cursosMatriculados: "Cursos matriculados",
        cursosCompletados: "Cursos completados",
        progresoGeneral: "Progreso general",
        misCursosTitulo: "Mis cursos",
        cursosActuales: "Cursos actuales",
        progreso: "Progreso",
        activo: "Activo",
        completado: "Completado",
        continuarCurso: "Continuar curso",
        verCurso: "Ver curso",

        temas: "Temas",
        tareas: "Tareas",
        elementosCompletados:
            "elementos completados",
        guardarProgreso: "Guardar progreso",
        finalizarCurso: "Finalizar curso",

        centroAyuda: "Centro de ayuda",
        comoAyudarte: "¿Cómo podemos ayudarte?",
        ayudaDescripcion:
            "Encuentra respuestas a las preguntas más frecuentes sobre Learnix.",
        comoMatricularme:
            "¿Cómo puedo matricularme en un curso?",
        comoMatricularmeTexto:
            "Selecciona un curso, revisa su información y pulsa el botón para matricularte.",
        dondeVeoCursos:
            "¿Dónde puedo ver mis cursos?",
        dondeVeoCursosTexto:
            "Después de iniciar sesión encontrarás tus cursos en la sección Mis cursos.",
        comoConsultoProgreso:
            "¿Cómo consulto mi progreso?",
        comoConsultoProgresoTexto:
            "Desde Mis cursos puedes abrir cada curso y actualizar los temas y tareas completadas.",
        necesitoCuenta:
            "¿Necesito una cuenta?",
        necesitoCuentaTexto:
            "Sí. Necesitas iniciar sesión para matricularte y acceder a tus cursos.",
        todaviaDudas:
            "¿Todavía tienes dudas?",
        comienzaExplorando:
            "Comienza explorando nuestros cursos.",
        verCursos: "Ver cursos",

        errorCargarAdministracion: "No se pudieron cargar los datos de administración.",
        panelAdministracion: "Panel de administración",
        adminDescripcion: "Gestiona los cursos, promociones y usuarios de Learnix desde un solo lugar.",
        cuentasRegistradas: "Cuentas registradas",
        promocionesActivas: "Promociones activas",
        promociones: "promociones",
        crearEditarEliminarCursos: "Crear, editar y eliminar cursos de Learnix.",
        crearAdministrarPromociones: "Crea descuentos y administra las promociones.",
        consultaEditaEliminaCuentas: "Consulta, edita y elimina cuentas.",

        gestionCursos: "Gestión de cursos",
        gestionCursosDescripcion: "Crea y administra la oferta de cursos de Learnix.",
        agregarCurso: "Agregar curso",
        editarCurso: "Editar curso",
        nuevoCurso: "Nuevo curso",
        cursosRegistrados: "Cursos registrados",
        administrarCursosDescripcion: "Administra los cursos disponibles en Learnix.",
        cursosLearnix: "Cursos de Learnix",
        nombreCurso: "Nombre del curso",
        categoria: "Categoría",
        precio: "Precio",
        areasInteres: "Áreas de interés",
        descripcionCurso: "Descripción del curso",
        temasCurso: "Temas del curso",
        tareasCurso: "Tareas del curso",
        agregarTema: "Agregar tema",
        agregarTarea: "Agregar tarea",
        eliminarTema: "Eliminar tema",
        eliminarTarea: "Eliminar tarea",
        temaPlaceholder: "Escribe el tema",
        tareaNumero: "Tarea",
        nombreTareaPlaceholder: "Nombre de la tarea",
        descripcionTareaPlaceholder: "Descripción de la tarea",
        ejemploPython: "Ej. Python para principiantes",
        ejemploProgramacion: "Ej. Programación",
        nombreProfesor: "Nombre del profesor",
        ejemploSemanas: "Ej. 8 semanas",
        programacionLogica: "programacion, logica",
        descripcionCursoPlaceholder: "Descripción del curso...",
        modalidadVirtual: "Virtual",
        modalidadPresencial: "Presencial",
        modalidadHibrida: "Híbrida",
        instruccionesTemas: "Introducción\nComponentes\nProyecto final",
        instruccionesTareas: "Ejercicio de componentes\nPráctica de estado\nProyecto final",
        acciones: "Acciones",
        crearCurso: "Crear curso",
        cerrar: "Cerrar",
        areasAyuda: "Separa las áreas con comas. También se utilizan para el test vocacional.",
        unTemaPorLinea: "Un tema por línea.",
        unaTareaPorLinea: "Una tarea por línea.",
        camposCursoJson: "Los campos del curso se guardan en JSON Server.",
        cargandoCursosAdmin: "Cargando cursos...",
        noCursosRegistrados: "No hay cursos registrados.",
        cursoActualizado: "El curso se actualizó correctamente.",
        cursoCreado: "El curso se creó correctamente.",
        cursoEliminado: "El curso se eliminó correctamente.",
        errorCargarCursos: "No se pudieron cargar los cursos.",
        camposCursoObligatorios: "Completa todos los campos obligatorios del curso.",
        precioMayorCero: "El precio debe ser mayor que cero.",
        errorActualizarCurso: "No se pudo actualizar el curso.",
        errorCrearCurso: "No se pudo crear el curso.",
        errorEliminarCurso: "No se pudo eliminar el curso.",
        confirmarEliminarCurso: "¿Seguro que deseas eliminar el curso",
        volverPanel: "Volver al panel",

        gestionPromociones: "Gestión de promociones",
        gestionPromocionesDescripcion: "Crea descuentos y administra las promociones de los cursos de Learnix.",
        agregarPromocion: "Agregar promoción",
        editarPromocion: "Editar promoción",
        nuevaPromocion: "Nueva promoción",
        promocionesRegistradas: "Promociones registradas",
        promocionesLearnix: "Promociones de Learnix",
        administrarDescuentos: "Administra los descuentos disponibles para los cursos.",
        activas: "Activas",
        seleccionarCurso: "Selecciona un curso",
        tipoDescuento: "Tipo de descuento",
        porcentaje: "Porcentaje",
        montoFijo: "Monto fijo",
        porcentajeDescuento: "Porcentaje de descuento",
        montoDescuento: "Monto de descuento",
        fechaInicio: "Fecha de inicio",
        fechaFin: "Fecha de finalización",
        promocionActiva: "Promoción activa",
        descripcionPromocion: "Descripción de la promoción (opcional)",
        descripcionPromocionPlaceholder: "Escribe una breve descripción de la promoción...",
        promocionAplicadaFechas: "La promoción se aplicará al curso seleccionado durante las fechas indicadas.",
        cargandoPromociones: "Cargando promociones...",
        noPromocionesRegistradas: "No hay promociones registradas.",
        utilizaAgregarPromocion: 'Utiliza el botón "Agregar promoción" para crear la primera.',
        descuentoTabla: "Descuento",
        inicio: "Inicio",
        finalizacion: "Finalización",
        promocionActualizada: "La promoción se actualizó correctamente.",
        promocionCreada: "La promoción se creó correctamente.",
        promocionEliminada: "La promoción se eliminó correctamente.",
        errorCargarPromociones: "No se pudieron cargar las promociones.",
        camposPromocionObligatorios: "Completa todos los campos obligatorios.",
        valorPromocionMayorCero: "El valor de la promoción debe ser mayor que cero.",
        porcentajeMaximo: "El porcentaje no puede ser mayor a 100%.",
        fechaFinalPosterior: "La fecha de finalización debe ser posterior a la fecha de inicio.",
        errorActualizarPromocion: "No se pudo actualizar la promoción.",
        errorCrearPromocion: "No se pudo crear la promoción.",
        errorEliminarPromocion: "No se pudo eliminar la promoción.",
        cursoNoEncontrado: "Curso no encontrado",
        estadoInactiva: "Inactiva",
        estadoProgramada: "Programada",
        estadoFinalizada: "Finalizada",
        estadoActiva: "Activa",
        eliminar: "Eliminar",
        confirmarEliminarPromocion: "¿Seguro que deseas eliminar la promoción de",

        gestionUsuarios: "Gestión de usuarios",
        gestionUsuariosDescripcion: "Consulta y administra las cuentas registradas en Learnix.",
        editarUsuario: "Editar usuario",
        cuentasRegistradasTitulo: "Cuentas registradas",
        nombre: "Nombre",
        correo: "Correo",
        rol: "Rol",
        usuario: "Usuario",
        administradorRol: "Administrador",
        usuarioActualizado: "Usuario actualizado correctamente.",
        usuarioEliminado: "Usuario eliminado correctamente.",
        errorCargarUsuarios: "No se pudieron cargar los usuarios.",
        errorActualizarUsuario: "No se pudo actualizar el usuario.",
        errorEliminarUsuario: "No se pudo eliminar el usuario.",
        camposUsuarioObligatorios: "Completa todos los campos.",
        cuentaSesionNoEliminar: "No puedes eliminar la cuenta con la que tienes la sesión iniciada.",
        confirmarEliminarUsuario: "¿Seguro que deseas eliminar al usuario",
        cargandoUsuarios: "Cargando usuarios..."
    },

    en: {
        inicio: "Home",
        misCursos: "My courses",
        administracion: "Administration",
        ayuda: "Help",
        perfil: "Profile",
        configuracion: "Settings",
        usuarios: "Users",
        cerrarSesion: "Log out",
        iniciarSesion: "Log in",
        crearCuenta: "Create account",
        testVocacional: "Career assessment",

        bienvenidoDeNuevo: "Welcome back",
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
        errorLogin: "Could not log in.",
        iniciandoSesion: "Logging in...",
        noTienesCuenta:
            "Don't have an account?",

        comienzaAprender: "Start learning",
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
            "The email is already registered.",
        cuentaNoCreada:
            "Could not create the account.",
        creandoCuenta:
            "Creating account...",
        crearCuentaTexto:
            "Create account",
        yaTienesCuenta:
            "Already have an account?",
        cuentaCreada:
            "Account created successfully. You can now log in.",


        configuracion: "Settings",
        aprendeAlgoNuevo: "Learn something new",
        formacionOnline: "Online learning",
        encuentraCurso: "Find the right course for you",
        exploraCursos: "Explore our course catalog and find an option to keep developing your skills.",
        todosCursos: "All courses",
        noHayCursos: "No courses available",
        cargandoCursos: "Loading courses...",
        noSePudieronCargarCursos: "Could not load the courses.",
        curso: "course",
        deDescuento: "off",

        consultaProgreso: "Check your progress and continue learning with your courses.",
        consultaActualiza: "View and update your personal information.",
        continuaAprendiendo: "Keep learning with your courses.",
        estado: "Status",
        cargandoTusCursos: "Loading your courses...",
        cursosActualmente: "Keep learning with the courses you are enrolled in.",
        aunNoCursos: "You do not have any courses yet",
        exploraOferta: "Explore our courses and find one to get started.",
        noSePudieronCargarTusCursos: "Could not load your courses.",

        miCuenta: "My account",
        datosCuenta: "Account details",
        informacionPersonal: "Personal information",
        idUsuario: "User ID",
        tipoCuenta: "Account type",
        estudiante: "Student",
        administrador: "Administrator",
        editarInformacion: "Edit information",
        guardarCambios: "Save changes",
        guardando: "Saving...",
        traduciendoGuardando: "Translating and saving...",
        informacionActualizada: "Information updated successfully.",
        errorActualizar: "Could not update the information.",
        otroUsuarioCorreo: "Another user already has this email.",

        cargando: "Loading...",
        completarDatosPago: "Complete payment details",
        completarMatricula: "Complete enrollment",
        confirmarMatricula: "Confirm enrollment",
        cvv: "CVV",
        matricula: "Enrollment",
        necesitasSesion: "You need to log in to continue.",
        noSePudoCompletar: "Could not complete the enrollment.",
        procesandoMatricula: "Processing enrollment...",
        revisaInformacion: "Review the information before completing your enrollment.",
        errorGuardarProgreso: "Could not save your progress.",

        personalizaLearnix:
            "Customize your Learnix experience.",

        idioma: "Language",
        idiomaPlataforma:
            "Platform language",
        cambiarMoneda: "Change currency",
        monedaColones: "Colones",
        monedaDolares: "US Dollars",
        seleccionaIdioma:
            "Select the language you want to use.",
        espanol: "Spanish",
        ingles: "English",

        apariencia: "Appearance",
        tema: "Theme",
        cambiaColores:
            "Change the visual appearance of the platform.",
        claro: "Light",
        oscuro: "Dark",
        lavanda: "Lavender",
        azul: "Blue",
        interfazClara:
            "Light interface",
        menorLuminosidad:
            "Lower brightness",
        tonosSuaves:
            "Soft tones",
        tonosFrios:
            "Cool tones",

        accesibilidad: "Accessibility",
        tamanoLetra: "Font size",
        ajustaTamano:
            "Adjust the text size according to your needs.",
        "muy-pequena": "Very small",
        pequena: "Small",
        normal: "Normal",
        grande: "Large",
        "muy-grande": "Very large",
        tamanoActual: "Current size",

        tipografia: "Typography",
        fuente: "Font",
        seleccionaFuente:
            "Select your preferred font.",
        modernaLimpia:
            "Modern and clean",
        simpleFamiliar:
            "Simple and familiar",
        altaLegibilidad:
            "High readability",
        estiloSerif:
            "Serif style",

        opcionesAccesibilidad:
            "Accessibility options",
        activaOpciones:
            "Enable the options you need.",
        altoContraste:
            "High contrast",
        aumentaDiferencia:
            "Increase the difference between colors.",
        reducirAnimaciones:
            "Reduce animations",
        reduceTransiciones:
            "Reduce transitions and animations.",

        preferenciasGuardadas:
            "Preferences are saved automatically.",
        restablecerPreferencias:
            "Reset preferences",

        cursosDisponibles:
            "Available courses",
        sigueAprendiendo:
            "Keep learning",
        cursos: "Courses",
        profesor: "Instructor",
        instructor: "Instructor",
        duracion: "Duration",
        modalidad: "Modality",
        inversion: "Investment",
        verInformacion:
            "View information",
        descuento: "discount",
        ahorras: "You save",

        matricularCurso:
            "Enroll course",
        cursoSeleccionado:
            "Selected course",
        inscripcion: "Enrollment",
        completarInscripcion:
            "Complete enrollment",
        revisarInformacion:
            "Review the information before completing your enrollment.",
        numeroTarjeta:
            "Card number",
        vencimiento:
            "Expiration",
        confirmarInscripcion:
            "Confirm enrollment",
        cancelar: "Cancel",
        volver: "Back",

        miEspacio: "My space",
        bienvenida: "Welcome",
        progresoCursos:
            "Check your progress and continue with your courses.",
        cursosMatriculados:
            "Enrolled courses",
        cursosCompletados:
            "Completed courses",
        progresoGeneral:
            "Overall progress",
        misCursosTitulo:
            "My courses",
        cursosActuales:
            "Current courses",
        progreso: "Progress",
        activo: "Active",
        completado:
            "Completed",
        continuarCurso:
            "Continue course",
        verCurso:
            "View course",

        temas: "Topics",
        tareas: "Tasks",
        elementosCompletados:
            "elements completed",
        guardarProgreso:
            "Save progress",
        finalizarCurso:
            "Complete course",

        centroAyuda:
            "Help center",
        comoAyudarte:
            "How can we help?",
        ayudaDescripcion:
            "Find answers to frequently asked questions about Learnix.",
        comoMatricularme:
            "How can I enroll in a course?",
        comoMatricularmeTexto:
            "Select a course, review its information and click the enrollment button.",
        dondeVeoCursos:
            "Where can I see my courses?",
        dondeVeoCursosTexto:
            "After logging in, you will find your courses in the My courses section.",
        comoConsultoProgreso:
            "How can I check my progress?",
        comoConsultoProgresoTexto:
            "From My courses you can open each course and update completed topics and tasks.",
        necesitoCuenta:
            "Do I need an account?",
        necesitoCuentaTexto:
            "Yes. You need to log in to enroll and access your courses.",
        todaviaDudas:
            "Still have questions?",
        comienzaExplorando:
            "Start by exploring our courses.",
        verCursos:
            "View courses",

        errorCargarAdministracion: "Could not load administration data.",
        panelAdministracion: "Administration panel",
        adminDescripcion: "Manage Learnix courses, promotions and users from one place.",
        cuentasRegistradas: "Registered accounts",
        promocionesActivas: "Active promotions",
        promociones: "Promotions",
        crearEditarEliminarCursos: "Create, edit and delete Learnix courses.",
        crearAdministrarPromociones: "Create discounts and manage promotions.",
        consultaEditaEliminaCuentas: "View, edit and delete accounts.",

        gestionCursos: "Course management",
        gestionCursosDescripcion: "Create and manage the Learnix course catalog.",
        agregarCurso: "Add course",
        editarCurso: "Edit course",
        nuevoCurso: "New course",
        cursosRegistrados: "Registered courses",
        administrarCursosDescripcion: "Manage the courses available on Learnix.",
        cursosLearnix: "Learnix Courses",
        nombreCurso: "Course name",
        categoria: "Category",
        precio: "Price",
        areasInteres: "Areas of interest",
        descripcionCurso: "Course description",
        temasCurso: "Course topics",
        tareasCurso: "Course tasks",
        agregarTema: "Add topic",
        agregarTarea: "Add task",
        eliminarTema: "Delete topic",
        eliminarTarea: "Delete task",
        temaPlaceholder: "Write the topic",
        tareaNumero: "Task",
        nombreTareaPlaceholder: "Task name",
        descripcionTareaPlaceholder: "Task description",
        ejemploPython: "E.g. Python for beginners",
        ejemploProgramacion: "E.g. Programming",
        nombreProfesor: "Instructor name",
        ejemploSemanas: "E.g. 8 weeks",
        programacionLogica: "programming, logic",
        descripcionCursoPlaceholder: "Course description...",
        modalidadVirtual: "Virtual",
        modalidadPresencial: "In-person",
        modalidadHibrida: "Hybrid",
        instruccionesTemas: "Introduction\nComponents\nFinal project",
        instruccionesTareas: "Component exercise\nState practice\nFinal project",
        acciones: "Actions",
        crearCurso: "Create course",
        cerrar: "Close",
        areasAyuda: "Separate the areas with commas. They are also used for the career assessment.",
        unTemaPorLinea: "One topic per line.",
        unaTareaPorLinea: "One task per line.",
        camposCursoJson: "Course fields are stored in JSON Server.",
        cargandoCursosAdmin: "Loading courses...",
        noCursosRegistrados: "No courses registered.",
        cursoActualizado: "The course was updated successfully.",
        cursoCreado: "The course was created successfully.",
        cursoEliminado: "The course was deleted successfully.",
        errorCargarCursos: "Could not load the courses.",
        camposCursoObligatorios: "Complete all required course fields.",
        precioMayorCero: "The price must be greater than zero.",
        errorActualizarCurso: "Could not update the course.",
        errorCrearCurso: "Could not create the course.",
        errorEliminarCurso: "Could not delete the course.",
        confirmarEliminarCurso: "Are you sure you want to delete the course",
        volverPanel: "Back to panel",

        gestionPromociones: "Promotion management",
        gestionPromocionesDescripcion: "Create discounts and manage Learnix course promotions.",
        agregarPromocion: "Add promotion",
        editarPromocion: "Edit promotion",
        nuevaPromocion: "New promotion",
        promocionesRegistradas: "Registered promotions",
        promocionesLearnix: "Learnix promotions",
        administrarDescuentos: "Manage the discounts available for courses.",
        activas: "Active",
        seleccionarCurso: "Select a course",
        tipoDescuento: "Discount type",
        porcentaje: "Percentage",
        montoFijo: "Fixed amount",
        porcentajeDescuento: "Discount percentage",
        montoDescuento: "Discount amount",
        fechaInicio: "Start date",
        fechaFin: "End date",
        promocionActiva: "Active promotion",
        descripcionPromocion: "Promotion description (optional)",
        descripcionPromocionPlaceholder: "Write a brief description of the promotion...",
        promocionAplicadaFechas: "The promotion will apply to the selected course during the specified dates.",
        cargandoPromociones: "Loading promotions...",
        noPromocionesRegistradas: "No promotions registered.",
        utilizaAgregarPromocion: 'Use the "Add promotion" button to create the first one.',
        descuentoTabla: "Discount",
        inicioPromocion: "Start",
        finalizacion: "End",
        promocionActualizada: "The promotion was updated successfully.",
        promocionCreada: "The promotion was created successfully.",
        promocionEliminada: "The promotion was deleted successfully.",
        errorCargarPromociones: "Could not load the promotions.",
        camposPromocionObligatorios: "Complete all required fields.",
        valorPromocionMayorCero: "The promotion value must be greater than zero.",
        porcentajeMaximo: "The percentage cannot be greater than 100%.",
        fechaFinalPosterior: "The end date must be after the start date.",
        errorActualizarPromocion: "Could not update the promotion.",
        errorCrearPromocion: "Could not create the promotion.",
        errorEliminarPromocion: "Could not delete the promotion.",
        cursoNoEncontrado: "Course not found",
        estadoInactiva: "Inactive",
        estadoProgramada: "Scheduled",
        estadoFinalizada: "Ended",
        estadoActiva: "Active",
        eliminar: "Delete",
        confirmarEliminarPromocion: "Are you sure you want to delete the promotion for",

        gestionUsuarios: "User management",
        gestionUsuariosDescripcion: "View and manage registered Learnix accounts.",
        editarUsuario: "Edit user",
        cuentasRegistradasTitulo: "Registered accounts",
        nombre: "Name",
        correo: "Email",
        rol: "Role",
        usuario: "User",
        administradorRol: "Administrator",
        usuarioActualizado: "User updated successfully.",
        usuarioEliminado: "User deleted successfully.",
        errorCargarUsuarios: "Could not load the users.",
        errorActualizarUsuario: "Could not update the user.",
        errorEliminarUsuario: "Could not delete the user.",
        camposUsuarioObligatorios: "Complete all fields.",
        cuentaSesionNoEliminar: "You cannot delete the account you are currently signed in with.",
        confirmarEliminarUsuario: "Are you sure you want to delete the user",
        cargandoUsuarios: "Loading users..."
    }
};


/* =========================================
   ESCALAS
========================================= */

const escalasLetra = {
    "muy-pequena": 0.85,
    pequena: 0.92,
    normal: 1,
    grande: 1.10,
    "muy-grande": 1.20
};


/* =========================================
   APLICAR ESCALA GLOBAL
========================================= */

function aplicarEscalaGlobal(escala) {
    const elementos = document.querySelectorAll(
        "body *"
    );

    elementos.forEach((elemento) => {
        if (
            elemento.matches(
                "script, style, svg, path, circle, rect, line, polyline, polygon"
            )
        ) {
            return;
        }

        const estilo = window.getComputedStyle(
            elemento
        );

        const fontSize = parseFloat(
            estilo.fontSize
        );

        if (
            !fontSize ||
            Number.isNaN(fontSize)
        ) {
            return;
        }

        if (
            !elemento.dataset.learnixOriginalFontSize
        ) {
            elemento.dataset.learnixOriginalFontSize =
                fontSize;
        }

        const original = parseFloat(
            elemento.dataset
                .learnixOriginalFontSize
        );

        if (
            !original ||
            Number.isNaN(original)
        ) {
            return;
        }

        elemento.style.setProperty(
            "font-size",
            `${original * escala}px`,
            "important"
        );
    });
}


/* =========================================
   RESTAURAR TAMAÑOS ORIGINALES
========================================= */

function limpiarEscalaGlobal() {
    const elementos = document.querySelectorAll(
        "[data-learnix-original-font-size]"
    );

    elementos.forEach((elemento) => {
        elemento.style.removeProperty(
            "font-size"
        );

        delete elemento.dataset
            .learnixOriginalFontSize;
    });
}


/* =========================================
   PROVIDER
========================================= */

export function ThemeProvider({
    children
}) {
    const [preferencias, setPreferencias] =
        useState(() => {
            const guardadas =
                localStorage.getItem(
                    "preferenciasLearnix"
                );

            if (!guardadas) {
                return {
                    ...preferenciasIniciales
                };
            }

            try {
                return {
                    ...preferenciasIniciales,
                    ...JSON.parse(guardadas)
                };
            } catch {
                return {
                    ...preferenciasIniciales
                };
            }
        });


    /* =====================================
       PREFERENCIAS
    ===================================== */

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

        const escala =
            escalasLetra[
                preferencias.tamanioLetra
            ] || 1;

        root.style.setProperty(
            "--learnix-font-scale",
            escala
        );

        /*
         * Aplicar la escala después de que
         * React haya actualizado la interfaz.
         */
        requestAnimationFrame(() => {
            aplicarEscalaGlobal(escala);
        });

    }, [preferencias]);


    /* =====================================
       OBSERVAR NUEVOS ELEMENTOS
    ===================================== */

    useEffect(() => {
        const escala =
            escalasLetra[
                preferencias.tamanioLetra
            ] || 1;

        const observer =
            new MutationObserver(() => {
                requestAnimationFrame(() => {
                    aplicarEscalaGlobal(
                        escala
                    );
                });
            });

        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );

        return () => {
            observer.disconnect();
        };
    }, [
        preferencias.tamanioLetra
    ]);


    /* =====================================
       PREFERENCIAS
    ===================================== */

    const cambiarPreferencia = (
        propiedad,
        valor
    ) => {
        setPreferencias(
            (actuales) => ({
                ...actuales,
                [propiedad]: valor
            })
        );
    };


    const restablecerPreferencias = () => {
        limpiarEscalaGlobal();

        setPreferencias({
            ...preferenciasIniciales
        });
    };


    /* =====================================
       TRADUCCIÓN
    ===================================== */

    const t = (clave) => {
        return (
            traducciones[
                preferencias.idioma
            ]?.[clave] ||
            traducciones.es?.[clave] ||
            clave
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
    return useContext(
        ThemeContext
    );
}