# Frontend - Gestión de Casos Judiciales (Ministerio Público de Guatemala)

Interfaz web desarrollada con React para facilitar la gestión de casos, visualización de reportes y control de fiscales. Compatible con la API RESTful del backend.

## 🧰 Tecnologías

- React + Vite
- React Router DOM
- Axios
- Bootstrap 5
- React Data Table Component

## 📁 Estructura

/pages # Vistas: Casos, Login, Reportes
/components # Tabla reutilizable
/api # Instancia Axios
/routes # Definición de rutas
App.jsx # Componente raíz
main.jsx # Entrada principal


## ⚙️ Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/frontend-mp.git
   cd frontend-mp

    Instalar dependencias:

npm install

Ejecutar la aplicación:

    npm run dev

    Asegúrate de que el archivo axiosInstance.js apunte al backend:

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

🧩 Funcionalidades

    Login seguro de fiscales

    Registro y reasignación de casos

    Reporte de todos los casos

    Reporte de intentos fallidos

    Validaciones y navegación protegida

    Logout y control de sesión

    Interfaz moderna y responsiva con Bootstrap
