# 🚀 Sistema de Gestión de Solicitudes - Frontend Vue 3

> **Proyecto académico** - Sistema para gestionar solicitudes de trabajo y documentos asociados

[![Vue 3](https://img.shields.io/badge/Vue-3.2-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0-FFD859?logo=pinia)](https://pinia.vuejs.org/)
[![PrimeVue](https://img.shields.io/badge/PrimeVue-4.4-007ACC)](https://primevue.org/)

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación Rápida](#instalación-rápida)
- [Uso con Makefile](#uso-con-makefile)
- [Uso con Docker](#uso-con-docker)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## ✨ Características

- ✅ **CRUD completo** de Solicitudes (Crear, Leer, Actualizar, Eliminar)
- ✅ **Gestión de estado** centralizada con Pinia
- ✅ **Componentes reutilizables** (BaseForm, BaseField, BaseButton)
- ✅ **UI moderna** con PrimeVue (DataTable, Dialog, Toast)
- ✅ **Responsive design** - Funciona en móviles y desktop
- ✅ **Validaciones** en tiempo real
- ✅ **Hot Module Replacement** para desarrollo rápido
- ⏳ CRUD de Documentos (en desarrollo)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 16.x ([Descargar](https://nodejs.org/))
- **npm** >= 8.x (viene con Node.js)
- **yarn** >= 1.22 (opcional, recomendado)

### Verificar instalación

```bash
node --version   # Debe mostrar v16.x o superior
npm --version    # Debe mostrar 8.x o superior
yarn --version   # (Opcional) Debe mostrar 1.22 o superior
```

---

## 🚀 Instalación Rápida

### Opción 1: Instalación Manual

```bash
# 1. Clonar el repositorio (si aplica)
git clone <url-del-repo>
cd Solicitudes-documentos-Vue

# 2. Instalar dependencias
yarn install
# o
npm install

# 3. Iniciar servidor de desarrollo
yarn dev
# o
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Opción 2: Con Makefile (Recomendado)

```bash
# Ver todos los comandos disponibles
make help

# Instalar e iniciar en un solo comando
make start

# O paso a paso
make install    # Instalar dependencias
make dev        # Iniciar servidor
```

### Opción 3: Con Docker

```bash
# Desarrollo
docker-compose up frontend-dev

# Producción
docker-compose --profile production up frontend-prod
```

---

## 🛠️ Uso con Makefile

El proyecto incluye un **Makefile** con comandos útiles:

### Comandos Principales

```bash
make help           # Mostrar ayuda con todos los comandos
make install        # Instalar dependencias
make dev            # Iniciar servidor de desarrollo
make build          # Compilar para producción
make preview        # Vista previa del build
make clean          # Limpiar archivos generados
make reinstall      # Limpiar y reinstalar
```

### Comandos Docker

```bash
make docker-build          # Construir imagen Docker
make docker-run            # Ejecutar contenedor
make docker-compose-up     # Levantar con docker-compose
make docker-compose-down   # Detener servicios
make docker-compose-logs   # Ver logs
```

### Comandos de Información

```bash
make info           # Información del proyecto
make check          # Verificar requisitos del sistema
```

---

## 🐳 Uso con Docker

### Desarrollo

```bash
# Levantar solo el frontend en modo desarrollo
docker-compose up frontend-dev

# Con logs en tiempo real
docker-compose up frontend-dev --build

# En segundo plano
docker-compose up -d frontend-dev
```

### Producción

```bash
# Levantar frontend en modo producción (Nginx)
docker-compose --profile production up frontend-prod

# Build y run
docker-compose --profile production up --build frontend-prod
```

### Comandos Útiles

```bash
# Ver logs
docker-compose logs -f frontend-dev

# Detener servicios
docker-compose down

# Reconstruir imagen
docker-compose build frontend-dev

# Ejecutar comando dentro del contenedor
docker-compose exec frontend-dev sh
```

---

## 📁 Estructura del Proyecto

```
Solicitudes-documentos-Vue/
├── src/
│   ├── stores/              # Estado global (Pinia)
│   │   └── solicitudes.store.js
│   ├── composables/         # Lógica reutilizable
│   │   └── useFormSolicitud.js
│   ├── components/
│   │   ├── common/          # Componentes base
│   │   │   ├── BaseForm.vue
│   │   │   ├── BaseField.vue
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseModal.vue
│   │   │   └── BaseFormSection.vue
│   │   ├── shared/          # Componentes compartidos
│   │   │   ├── NavBar.vue
│   │   │   └── Menu.vue
│   │   ├── solicitudes/     # Componentes de solicitudes
│   │   │   ├── SolicitudForm.vue
│   │   │   ├── SolicitudList.vue
│   │   │   └── SolicitudDetail.vue
│   │   └── documentos/      # Componentes de documentos
│   │       └── DocumentoForm.vue
│   ├── api/                 # Mock APIs (localStorage)
│   │   ├── solicitud.js
│   │   └── documento.js
│   ├── utils/               # Utilidades
│   │   └── constants.js
│   ├── views/               # Vistas/Páginas
│   │   └── Home.vue
│   ├── styles/              # Estilos globales
│   │   └── primevue-global.css
│   ├── App.vue              # Componente raíz
│   └── main.js              # Punto de entrada
├── public/                  # Assets estáticos
├── Makefile                 # Comandos útiles
├── Dockerfile               # Configuración Docker
├── docker-compose.yml       # Orquestación Docker
├── nginx.conf               # Configuración Nginx
├── vite.config.js           # Configuración Vite
├── package.json             # Dependencias
└── README.md                # Este archivo
```

---

## 📜 Scripts Disponibles

### Con yarn

```bash
yarn dev        # Iniciar servidor de desarrollo
yarn build      # Compilar para producción
yarn preview    # Vista previa del build
```

### Con npm

```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Compilar para producción
npm run preview    # Vista previa del build
```

---

## 🛠️ Tecnologías Utilizadas

### Core

- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progresivo
- **[Vite](https://vitejs.dev/)** - Build tool ultra-rápido
- **[Pinia](https://pinia.vuejs.org/)** - State management oficial de Vue

### UI/UX

- **[PrimeVue](https://primevue.org/)** - Librería de componentes UI
- **[PrimeIcons](https://primevue.org/icons)** - Iconos
- **[Aura Theme](https://primevue.org/theming/)** - Tema moderno

### Utilidades

- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[Lodash](https://lodash.com/)** - Utilidades JavaScript
- **[Moment.js](https://momentjs.com/)** - Manejo de fechas
- **[UUID](https://github.com/uuidjs/uuid)** - Generación de IDs únicos

### DevOps

- **[Docker](https://www.docker.com/)** - Containerización
- **[Nginx](https://nginx.org/)** - Servidor web para producción

---

## 🎯 Uso del Sistema

### 1. Crear una Solicitud

1. Navega a la sección "Solicitudes"
2. Haz clic en "Nueva Solicitud"
3. Llena el formulario con los datos requeridos
4. Haz clic en "Crear Solicitud"

### 2. Ver Solicitudes

- La lista se muestra automáticamente en la vista de Solicitudes
- Usa la paginación para navegar entre páginas
- Haz clic en cualquier fila para ver el detalle

### 3. Editar una Solicitud

1. Haz clic en una solicitud para ver su detalle
2. Haz clic en el botón "Editar"
3. Modifica los campos necesarios
4. Haz clic en "Actualizar Solicitud"

### 4. Eliminar una Solicitud

1. Haz clic en una solicitud para ver su detalle
2. Haz clic en el botón "Eliminar"
3. La solicitud se eliminará inmediatamente

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URLs del backend (cuando esté conectado)
VITE_API_SOLICITUDES_URL=http://localhost:8082
VITE_API_DOCUMENTOS_URL=http://localhost:8083

# Modo de desarrollo
VITE_MODE=development
```

### Configuración de Vite

Edita `vite.config.js` para personalizar:

```javascript
export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist'
  }
})
```

---

## 🐛 Solución de Problemas

### Error: "Cannot find module"

```bash
# Limpiar y reinstalar
make reinstall
# o
rm -rf node_modules && yarn install
```

### Error: "Port 5173 already in use"

```bash
# Cambiar puerto en vite.config.js
server: { port: 3000 }
```

### Docker: "Cannot connect to Docker daemon"

```bash
# Iniciar Docker Desktop (Windows/Mac)
# o iniciar servicio Docker (Linux)
sudo systemctl start docker
```

---

## 📚 Documentación Adicional

- [PROGRESO-SESION-1.md](./PROGRESO-SESION-1.md) - Progreso de desarrollo
- [ROADMAP.md](./ROADMAP.md) - Plan de desarrollo
- [Documentación Vue 3](https://vuejs.org/guide/introduction.html)
- [Documentación Pinia](https://pinia.vuejs.org/introduction.html)
- [Documentación PrimeVue](https://primevue.org/setup)

---

## 👨‍💻 Autor

**[Tu Nombre]**  
Proyecto académico - [Nombre de la Universidad]

---

## 📄 Licencia

Este proyecto es de uso académico.

---

## 🙏 Agradecimientos

- Instructor: Fernando Herrera (Klerith) - Patrón de arquitectura
- Comunidad Vue.js
- Documentación oficial de PrimeVue

---

**¿Problemas?** Abre un issue o contacta al autor.
