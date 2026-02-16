# My Notes App

Una aplicación moderna y reactiva para la gestión de notas personales. Construida con **React**, **Vite** y una arquitectura personalizada basada en Servicios y Reactores para un manejo de estado y efectos secundarios totalmente desacoplado.

## Funcionalidades Principales

### Autenticación Robusta
- **Login y Registro:** Integración con API mediante JWT (Access Token + Refresh Token).
- **Manejo de Sesión:** Renovación automática de tokens (Silent Refresh) mediante interceptores de Axios.
- **Rutas Protegidas:** Sistema de `ProtectedRoute` que impide el acceso a usuarios no autenticados.
- **Navegación por Eventos:** Redirección automática basada en eventos del sistema (`app:navigate`).

### Gestión de Notas (CRUD)
- **Crear y Editar:** Formulario dinámico para gestionar el contenido de tus notas.
- **Organización Visual:**
  - Asignación de **Colores** personalizados a cada nota.
  - Sistema de **Etiquetas (Tags)** para categorización.
- **Listado Inteligente:** Búsqueda en tiempo real y ordenamiento (por fecha o título).
- **Eliminación Segura:** Confirmación antes de borrar elementos.

## Arquitectura del Proyecto

Esta aplicación utiliza un patrón de diseño avanzado para separar responsabilidades:

1. **Vistas (Views/Forms):** Componentes visuales "tontos" que solo reciben props y emiten eventos. No tienen lógica de negocio.
2. **Controladores (Controllers):** Componentes de orden superior (`withReactive`) que conectan la vista con los servicios. Manejan el estado efímero de la UI.
3. **Servicios (Services):** Módulos de lógica pura (JS) que comunican con la API.
4. **Reactores (Reactors):** Escuchan el resultado de los servicios y ejecutan efectos secundarios:
   - Mostrar notificaciones (Toasts).
   - Actualizar el almacenamiento local.
   - Disparar eventos de navegación.

## Stack Tecnológico

- **Core:** React 18 + Vite
- **Estilos:** TailwindCSS + DaisyUI
- **Enrutamiento:** React Router DOM v6
- **Peticiones HTTP:** Axios (Instancia personalizada con Interceptors)
- **Estado Global:** React Context (Auth) + Custom Reactive System
- **Notificaciones:** React Hot Toast

## Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd my-notes-app

2. **Instalar dependencias:**
   ```bash
   npm install

3. **Correr el proyecto en desarrollo:**
   ```bash
   npm run dev
