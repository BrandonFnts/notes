# Configuración Manual de Autenticación (Modo Desarrollo)

Debido a que el proyecto se encuentra en una etapa donde la Interfaz de Usuario (UI) para Iniciar Sesión aún no está implementada, es necesario configurar los tokens de acceso manualmente en el navegador para poder consumir la API y visualizar las notas, tambien se debe de tomar en cuenta que la api esta hosteada en la version gratuita de Render por lo que la primera peticion tardara en realizarse.

> ⚠️ Este proceso solo se debe realizar la primera vez que ejecutes el proyecto o cuando tus tokens hayan expirado y el mecanismo de refresh falle.

---

# Pasos para Obtener y Configurar Tokens

## 1️ Obtener Credenciales desde la API (Postman)

Necesitas crear un usuario y obtener sus tokens usando una herramienta como **Postman, Insomnia o cURL**.

**Base URL:**

```
https://notes-api-6bx3.onrender.com
```

---

### A. Registrar un Usuario (Si no tienes uno)

- **Método:** `POST`  
- **Endpoint:** `/auth/register`

**Body (JSON):**

```json
{
  "email": "tu_email@ejemplo.com",
  "password": "Password123"
}
```

---

### B. Iniciar Sesión (Obtener Tokens)

- **Método:** `POST`  
- **Endpoint:** `/auth/login`

**Body (JSON):**

```json
{
  "email": "tu_email@ejemplo.com",
  "password": "Password123"
}
```

### Respuesta Exitosa

Copia los valores de `accessToken` y `refreshToken` que recibirás en la respuesta:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

## 2️ Inyectar Tokens en el Navegador

Una vez que tienes los tokens copiados, debes guardarlos en el **Local Storage** de tu navegador donde corre la aplicación (ejemplo: `http://localhost:5173`).

---

### Método A: Vía Consola (Rápido)

1. Abre tu proyecto en el navegador.
2. Presiona `F12` o **Click Derecho → Inspeccionar** para abrir las DevTools.
3. Ve a la pestaña **Console**.
4. Pega los siguientes comandos (reemplazando con tus tokens reales) y presiona Enter:

```javascript
localStorage.setItem("accessToken", "PEGA_AQUI_TU_ACCESS_TOKEN");
localStorage.setItem("refreshToken", "PEGA_AQUI_TU_REFRESH_TOKEN");
```

---

### Método B: Vía Interfaz Gráfica (Application)

1. Abre las DevTools (`F12`).
2. Ve a la pestaña **Application** (Chrome/Edge) o **Storage** (Firefox).
3. En el menú lateral izquierdo, despliega **Local Storage** y selecciona tu URL (ej: `http://localhost:5173`).
4. Haz doble click en la columna vacía de **Key** y escribe:

   - `accessToken`
   - En **Value** pega tu token.

5. Repite el proceso para:

   - `refreshToken`

---

## Verificar

1. Recarga la página (`F5`).
2. La aplicación ahora debería cargar la lista de notas automáticamente.

Si ves las notas, ¡la configuración fue exitosa!

---

# Notas Adicionales

### Persistencia

El sistema ya cuenta con lógica para usar el `refreshToken` automáticamente cuando el `accessToken` expire. No deberías tener que repetir este proceso frecuentemente.

### Error 401

Si en la consola ves errores constantes `401 Unauthorized`, significa que el **Refresh Token también expiró**.

En ese caso deberás repetir:

- Paso 1 (Login)
- Paso 2 (Actualizar tokens en Local Storage)
