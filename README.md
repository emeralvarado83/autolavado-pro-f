# Car Wash Website - React + Express + MySQL + Node.js

Sitio web para autolavado construido con React (frontend) y Express + MySQL (backend).

## Stack Tecnológico

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Base de Datos**: MySQL
- **Autenticación**: JWT (JSON Web Tokens)

## Requisitos Previos

- Node.js (v16 o superior)
- MySQL (v8.0 o superior)
- npm o yarn

## Instalación

### 1. Clonar e instalar dependencias del frontend

```bash
npm install
```

### 2. Configurar el backend

```bash
cd server
npm install
```

### 3. Configurar la base de datos

1. Asegúrate de que MySQL esté corriendo
2. Crea un archivo `.env` en la carpeta `server` basándote en `server/.env.example`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=car_wash_db
JWT_SECRET=tu-secret-key-seguro
PORT=3001
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

3. Inicializa la base de datos:

```bash
cd server
npm run init-db
```

Esto creará la base de datos, las tablas y un usuario administrador por defecto.

### 4. Configurar el frontend

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3001/api
```

## Ejecución

### Desarrollo

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` (o el puerto que Vite asigne)
El backend estará disponible en `http://localhost:3001`

### Producción

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
npm run build
npm run preview
```

## Estructura del Proyecto

```
car_wash_website_v2/
├── server/                 # Backend Express
│   ├── database/          # Scripts de base de datos
│   │   ├── schema.sql     # Esquema SQL
│   │   └── init.js        # Script de inicialización
│   ├── index.js           # Servidor Express
│   └── package.json       # Dependencias del backend
├── src/                   # Frontend React
│   ├── components/       # Componentes React
│   ├── context/          # Context API
│   ├── lib/              # Utilidades y API client
│   ├── pages/            # Páginas
│   └── types/            # TypeScript types
└── package.json          # Dependencias del frontend
```

## Credenciales por Defecto

- **Email**: admin@example.com
- **Contraseña**: admin123

⚠️ **Importante**: Cambia estas credenciales en producción.

## API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Contenido (Público)
- `GET /api/content` - Obtener todo el contenido

### Contenido (Protegido - Requiere JWT)
- `PUT /api/slider` - Actualizar slider
- `PUT /api/tips` - Actualizar consejos
- `PUT /api/gallery` - Actualizar galería
- `PUT /api/contact` - Actualizar información de contacto

## Características

- ✅ Panel de administración
- ✅ Gestión de slider principal
- ✅ Gestión de consejos de mantenimiento
- ✅ Galería de imágenes
- ✅ Información de contacto
- ✅ Autenticación JWT
- ✅ Diseño responsive

## Notas

- El proyecto usa JWT para autenticación. Los tokens se almacenan en `localStorage`.
- Las imágenes se almacenan como URLs (puedes usar servicios como Cloudinary o AWS S3).
- Asegúrate de cambiar el `JWT_SECRET` en producción.

## Licencia

Este proyecto fue generado a través de Alpha. Para más información, visita [dualite.dev](https://dualite.dev).
