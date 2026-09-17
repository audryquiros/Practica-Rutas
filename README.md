# Learnix

Plataforma web de cursos desarrollada con React + Vite como parte de la Práctica #1 de Desarrollo Front-End.

El proyecto implementa navegación mediante React Router, rutas públicas y privadas, autenticación mediante Context, persistencia de sesión, protección por roles y navegación dinámica según el usuario autenticado.

---

## 1. Tecnologías utilizadas

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- Context API
- JSON Server
- LocalStorage

---

## 2. Objetivo

Construir una plataforma de cursos en línea que permita:

- Consultar cursos disponibles.
- Ver información detallada de cada curso.
- Registrarse e iniciar sesión.
- Acceder a contenido privado después de autenticarse.
- Gestionar el perfil y las preferencias de la cuenta.
- Matricularse en cursos mediante un proceso de pago simulado.
- Administrar cursos y usuarios mediante una cuenta con rol administrador.
- Proteger rutas según el estado de autenticación y el rol del usuario.

---

## 3. Estructura del proyecto

```text
plataforma-cursos/
│
├── db.json
├── package.json
├── vite.config.js
├── README.md
│
└── src/
    │
    ├── components/
    │   ├── Navbar/
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.css
    │   │
    │   ├── CourseCard/
    │   │   ├── CourseCard.jsx
    │   │   └── CourseCard.css
    │   │
    │   ├── CourseModal/
    │   │   ├── CourseModal.jsx
    │   │   └── CourseModal.css
    │   │
    │   └── CourseProgressModal/
    │       ├── CourseProgressModal.jsx
    │       └── CourseProgressModal.css
    │
    ├── context/
    │   ├── AuthContext.jsx
    │   └── ThemeContext.jsx
    │
    ├── pages/
    │   ├── Home/
    │   ├── Login/
    │   ├── Registro/
    │   ├── Dashboard/
    │   ├── Perfil/
    │   ├── Configuracion/
    │   ├── Ayuda/
    │   ├── Pago/
    │   ├── Admin/
    │   ├── Usuarios/
    │   ├── Forbidden/
    │   └── NotFound/
    │
    ├── routes/
    │   ├── Routing.jsx
    │   ├── PrivateRoutes.jsx
    │   ├── GuestRoutes.jsx
    │   └── RoleRoutes.jsx
    │
    ├── services/
    │   ├── cursosService.js
    │   ├── matriculasService.js
    │   └── usuariosService.js
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css