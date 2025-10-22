# 🚀 Sistema de Gestión de Solicitudes y Documentos

> **Aplicación web moderna** desarrollada con **Vue 3** y **Composition API** para la gestión integral de solicitudes de trabajo y documentos asociados. Conectada a un backend desarrollado en **Go**.

[![Vue 3](https://img.shields.io/badge/Vue-3.2-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0-FFD859?logo=pinia)](https://pinia.vuejs.org/)
[![PrimeVue](https://img.shields.io/badge/PrimeVue-4.4-007ACC)](https://primevue.org/)
[![Axios](https://img.shields.io/badge/Axios-1.12-5A29E4)](https://axios-http.com/)

---

## 📋 Tabla de Contenidos

- [Instalación Rápida (5 minutos)](#-instalación-rápida-5-minutos)
- [Requisitos Previos](#-requisitos-previos)
- [Configuración Detallada](#-configuración-detallada)
- [Características Principales](#-características-principales)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura y Flujo de Datos](#-arquitectura-y-flujo-de-datos)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Solución de Problemas Comunes](#-solución-de-problemas-comunes)
- [Scripts Disponibles](#-scripts-disponibles)
- [Guía para Desarrolladores](#-guía-para-desarrolladores)
- [Autor](#-autor)

---

## ⚡ Instalación Rápida (5 minutos)

### Para Desarrolladores y QA

```bash
# 1️⃣ Clonar el repositorio
git clone https://github.com/KarlaR3it/Solicitudes-documentos-Vue.git
cd Solicitudes-documentos-Vue

# 2️⃣ Instalar dependencias
npm install

# 3️⃣ Configurar variables de entorno
# Windows (PowerShell):
copy .env.example .env

# macOS/Linux:
cp .env.example .env

# 4️⃣ Verificar que el backend esté corriendo
# ✅ API Solicitudes: http://localhost:8082/solicitudes
# ✅ API Documentos: http://localhost:8083/documentos

# 5️⃣ Iniciar el servidor de desarrollo
npm run dev

# 6️⃣ Abrir en el navegador
# http://localhost:5173
```

**¡Listo!** La aplicación debería estar corriendo sin errores.

---

## 📦 Requisitos Previos

### Software Necesario

| Software | Versión Mínima | Link de Descarga |
|----------|----------------|------------------|
| **Node.js** | 18.x o superior | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x o superior | Incluido con Node.js |
| **Backend Go** | - | Servicios en puertos 8082 y 8083 |

### Verificar Instalación

```bash
# Verificar Node.js
node --version
# Debe mostrar: v18.x.x o superior

# Verificar npm
npm --version
# Debe mostrar: 9.x.x o superior

# Verificar backend (debe retornar JSON)
curl http://localhost:8082/solicitudes
curl http://localhost:8083/documentos
```

### Instalar Node.js (si no lo tienes)

#### Windows:
1. Descargar instalador desde [nodejs.org](https://nodejs.org/)
2. Ejecutar el instalador (.msi)
3. Seguir el asistente de instalación
4. Reiniciar la terminal

#### macOS:
```bash
# Opción 1: Instalador oficial
# Descargar desde nodejs.org

# Opción 2: Homebrew
brew install node
```

#### Linux (Ubuntu/Debian):
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 🔧 Configuración Detallada

### 1. Variables de Entorno

El proyecto usa variables de entorno para configurar las URLs del backend.

**Archivo `.env.example`** (plantilla):
```env
# API de Solicitudes
VITE_API_SOLICITUDES_URL=http://localhost:8082

# API de Documentos
VITE_API_DOCUMENTOS_URL=http://localhost:8083
```

**Crear tu archivo `.env`**:
```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

**⚠️ Importante**: El archivo `.env` NO se commitea a Git (está en `.gitignore`).

### 2. Configuración del Backend

Asegúrate de que los servicios backend estén corriendo:

```bash
# Servicio de Solicitudes
# Puerto: 8082
# Endpoint: http://localhost:8082/solicitudes

# Servicio de Documentos
# Puerto: 8083
# Endpoint: http://localhost:8083/documentos
```

### 3. Puertos Personalizados

Si tu backend usa puertos diferentes:

1. Edita el archivo `.env`:
```env
VITE_API_SOLICITUDES_URL=http://localhost:TU_PUERTO
VITE_API_DOCUMENTOS_URL=http://localhost:TU_PUERTO
```

2. Reinicia el servidor de desarrollo:
```bash
npm run dev
```

---

## ✨ Características Principales

### 🎯 Gestión de Solicitudes (Entidad Primaria)

#### ✅ Crear Solicitud
- **Formulario completo** con 18 campos
- **Validaciones en tiempo real**:
  - Campos obligatorios (título, estado, área, país, etc.)
  - Longitud de texto (título max 200 caracteres)
  - Rangos numéricos (vacantes 1-100)
  - Validación de fechas (fecha inicio debe ser futura)
  - Validación de rangos (renta hasta > renta desde)
  - Campos condicionales (área "Otra", país "Otro")
- **Feedback visual**: Campos con error se marcan en rojo
- **Mensajes descriptivos**: Toast notifications con detalles del error

#### ✅ Editar Solicitud
- Carga automática de datos existentes
- Validaciones idénticas a creación
- Protección de campos inmutables (usuario_id)
- Confirmación antes de guardar cambios

#### ✅ Eliminar Solicitud
- Confirmación con diálogo modal
- Eliminación con feedback visual
- Actualización automática de la lista

#### ✅ Listar Solicitudes
- **DataTable de PrimeVue** con:
  - Paginación (5, 10, 25 registros por página)
  - Búsqueda global
  - Ordenamiento por columnas
  - Filtros por estado
- **Tags de colores** según estado
- **Acciones rápidas**: Ver detalle, editar, eliminar

### 📄 Gestión de Documentos (Entidad Secundaria)

- CRUD completo
- Vinculación con solicitudes
- Iconos visuales por tipo de archivo (PDF, DOCX, PNG, JPG)
- Validaciones de campos

### 🎨 Interfaz de Usuario

- **Diseño responsive**: Funciona en móviles, tablets y desktop
- **Tema moderno**: Gradientes y colores corporativos
- **Navegación intuitiva**: Menú hamburguesa global
- **Notificaciones**: Toast messages para feedback
- **Modo oscuro**: Soporte para dark mode

### 🛣️ Routing (Vue Router)

- **Navegación real**: URLs amigables (`/`, `/solicitudes`, `/documentos`, `/about`)
- **Historial del navegador**: Botones atrás/adelante funcionan
- **Lazy loading**: Componentes se cargan solo cuando se necesitan
- **Ruta activa**: Indicador visual en el menú
- **Títulos dinámicos**: Cada página actualiza el título del navegador
- **Ruta 404**: Redirección automática al inicio si la ruta no existe

---

## 📁 Estructura del Proyecto

```
solicitudes-vue/
├── src/
│   ├── api/                      # 🌐 Capa de comunicación con backend
│   │   ├── client.js            # Cliente HTTP centralizado (Axios)
│   │   ├── solicitud.js         # Endpoints de solicitudes
│   │   └── documento.js         # Endpoints de documentos
│   │
│   ├── components/              # 🧩 Componentes Vue
│   │   ├── common/             # Componentes base reutilizables
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseConfirm.vue
│   │   │   ├── BaseField.vue
│   │   │   ├── BaseForm.vue
│   │   │   ├── BaseFormSection.vue
│   │   │   └── FileIcon.vue
│   │   ├── shared/             # Componentes compartidos
│   │   │   ├── NavBar.vue      # Menú de navegación global
│   │   │   ├── Menu.vue        # Menú hamburguesa
│   │   │   └── Footer.vue
│   │   ├── solicitudes/        # Módulo de solicitudes
│   │   │   ├── SolicitudForm.vue    # Formulario crear/editar
│   │   │   ├── SolicitudList.vue    # Lista con DataTable
│   │   │   └── SolicitudDetail.vue  # Vista detallada
│   │   └── documentos/         # Módulo de documentos
│   │       ├── DocumentoForm.vue
│   │       ├── DocumentoList.vue
│   │       └── DocumentoDetail.vue
│   │
│   ├── composables/            # 🔄 Lógica reutilizable (Composition API)
│   │   ├── useForm.js         # Lógica genérica de formularios
│   │   └── useTheme.js        # Manejo del tema
│   │
│   ├── stores/                 # 📦 Estado global (Pinia)
│   │   ├── solicitudes.store.js # Estado de solicitudes
│   │   └── documentos.store.js  # Estado de documentos
│   │
│   ├── config/                 # ⚙️ Configuración
│   │   └── api.config.js      # URLs y configuración de APIs
│   │
│   ├── constants/              # 📋 Constantes
│   │   ├── solicitud.constants.js # Opciones de solicitudes
│   │   └── documento.constants.js # Opciones de documentos
│   │
│   ├── utils/                  # 🛠️ Utilidades
│   │   └── validators.js      # Funciones de validación
│   │
│   ├── router/                 # 🛣️ Configuración de rutas
│   │   └── index.js           # Vue Router con lazy loading
│   │
│   ├── views/                  # 📄 Vistas principales (páginas)
│   │   ├── Home.vue           # Página de inicio (/)
│   │   ├── SolicitudesView.vue # Página de solicitudes (/solicitudes)
│   │   ├── DocumentosView.vue  # Página de documentos (/documentos)
│   │   └── About.vue          # Página acerca del autor (/about)
│   │
│   ├── styles/                 # 🎨 Estilos globales
│   │   ├── primevue-global.css
│   │   └── theme.css
│   │
│   ├── App.vue                 # 🏠 Componente raíz
│   └── main.js                 # 🚀 Punto de entrada
│
├── public/                     # Assets públicos
├── .env.example               # Plantilla de variables de entorno
├── .env                       # Variables de entorno (NO commitear)
├── .gitignore                 # Archivos ignorados por Git
├── index.html                 # HTML principal
├── vite.config.js             # Configuración de Vite
├── package.json               # Dependencias y scripts
└── README.md                  # Este archivo
```

---

## 🏗️ Arquitectura y Flujo de Datos

### Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────┐
│                      USUARIO                            │
│                   (Navegador)                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Interacción
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  COMPONENTES VUE                        │
│  (SolicitudForm, SolicitudList, DocumentoList, etc.)   │
│  - Composition API                                      │
│  - Reactive State                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Usa
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  STORES (Pinia)                         │
│     solicitudes.store.js  │  documentos.store.js       │
│     - Estado global       │  - Estado global           │
│     - Lógica de negocio   │  - Lógica de negocio       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Llama a
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    API LAYER                            │
│     solicitud.js          │  documento.js              │
│     - Endpoints           │  - Endpoints               │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Usa
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  HTTP CLIENT (Axios)                    │
│                   client.js                             │
│     - Configuración centralizada                        │
│     - Interceptors (request/response)                   │
│     - Manejo de errores automático                      │
│     - Logs en desarrollo                                │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP Request
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  BACKEND APIs (Go)                      │
│   localhost:8082/solicitudes  │  localhost:8083/docs   │
└─────────────────────────────────────────────────────────┘
```

### Ejemplo de Flujo: Crear una Solicitud

1. **Usuario** completa el formulario y hace clic en "Crear Solicitud"
2. **SolicitudForm.vue** valida los datos localmente
3. Si es válido, llama a `solicitudesStore.createSolicitud(data)`
4. **Store** llama a `saveSolicitudApi(data)` desde `api/solicitud.js`
5. **API Layer** usa `solicitudesClient.post()` desde `api/client.js`
6. **Axios Client** envía POST a `http://localhost:8082/solicitudes`
7. **Backend Go** procesa y responde con la solicitud creada
8. **Axios Client** recibe respuesta y ejecuta interceptors
9. **Store** actualiza el estado global con la nueva solicitud
10. **Componente** muestra toast de éxito y cierra el formulario
11. **Lista** se actualiza automáticamente (reactividad de Vue)

### Principios Aplicados

#### 1. Separación de Responsabilidades
- **Componentes**: Solo UI y lógica de presentación
- **Stores**: Estado global y lógica de negocio
- **API Layer**: Comunicación con el backend
- **Utils**: Funciones puras y reutilizables

#### 2. Single Source of Truth
- El estado global vive en **Pinia stores**
- Los componentes leen del store, no duplican estado
- Las mutaciones solo ocurren en los stores

#### 3. Composition API
- Todos los componentes usan **Composition API** (no Options API)
- **Composables** para lógica reutilizable
- Mejor organización y reusabilidad del código

#### 4. Configuración Centralizada
- URLs en **variables de entorno** (.env)
- Cliente HTTP único con interceptors
- Constantes en archivos dedicados

---

## 🛠️ Tecnologías Utilizadas

### Frontend Core

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Vue 3** | 3.2.13 | Framework JavaScript progresivo con Composition API |
| **Vue Router** | 4.x | Routing oficial de Vue con navegación declarativa |
| **Vite** | 5.4.11 | Build tool ultra-rápido con HMR |
| **Pinia** | 3.0.3 | State management oficial de Vue |

### UI/UX

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **PrimeVue** | 4.4.1 | Librería de componentes UI empresariales |
| **PrimeIcons** | 7.0.0 | Conjunto de iconos |
| **Aura Theme** | 4.4.1 | Tema moderno y personalizable |

### Comunicación con Backend

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Axios** | 1.12.2 | Cliente HTTP para comunicación con APIs REST |

### Utilidades

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Moment.js** | 2.30.1 | Manejo y formateo de fechas |
| **Lodash** | 4.17.21 | Utilidades JavaScript |
| **@vueuse/core** | 13.9.0 | Composables de utilidad |

### DevOps

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Prettier** | - | Formateador de código |
| **Sass** | 1.32.7 | Preprocesador CSS |

---

## 🐛 Solución de Problemas Comunes

### ❌ Error: "Cannot connect to backend"

**Síntoma**: La aplicación no carga datos, errores en consola sobre conexión.

**Causa**: El backend no está corriendo o está en un puerto diferente.

**Solución**:

```bash
# 1. Verifica que los servicios backend estén activos
curl http://localhost:8082/solicitudes
curl http://localhost:8083/documentos

# Si no responden, inicia el backend Go

# 2. Si usan puertos diferentes, actualiza .env
# Edita el archivo .env:
VITE_API_SOLICITUDES_URL=http://localhost:TU_PUERTO
VITE_API_DOCUMENTOS_URL=http://localhost:TU_PUERTO

# 3. Reinicia el servidor de desarrollo
npm run dev
```

---

### ❌ Error: "Port 5173 already in use"

**Síntoma**: El servidor no inicia, mensaje de puerto ocupado.

**Causa**: Ya hay otro proceso usando el puerto 5173.

**Solución**:

#### Windows:
```powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :5173

# Matar el proceso (reemplaza PID con el número que aparece)
taskkill /PID [PID] /F
```

#### macOS/Linux:
```bash
# Ver qué proceso usa el puerto
lsof -i :5173

# Matar el proceso (reemplaza PID con el número que aparece)
kill -9 [PID]
```

#### Alternativa: Cambiar el puerto
Edita `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000  // Cambiar a otro puerto
  }
})
```

---

### ❌ Error: "Module not found" o errores de dependencias

**Síntoma**: Errores al importar módulos, aplicación no compila.

**Causa**: Dependencias no instaladas o corruptas.

**Solución**:

```bash
# Limpiar y reinstalar dependencias
npm run clean

# O manualmente:
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Error: "CORS policy"

**Síntoma**: Errores de CORS en la consola del navegador.

**Causa**: El backend no permite peticiones desde el frontend.

**Solución**: Contactar al equipo de backend para configurar CORS correctamente. El backend Go debe incluir headers:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
Access-Control-Allow-Headers: Content-Type
```

---

### ❌ Error: Variables de entorno no se cargan

**Síntoma**: Las URLs apuntan a `undefined` o valores por defecto.

**Causa**: Archivo `.env` no existe o tiene nombres incorrectos.

**Solución**:

```bash
# 1. Verificar que existe .env
ls -la .env

# 2. Si no existe, crearlo desde la plantilla
cp .env.example .env

# 3. Verificar que las variables empiecen con VITE_
# ✅ Correcto: VITE_API_SOLICITUDES_URL
# ❌ Incorrecto: API_SOLICITUDES_URL

# 4. Reiniciar el servidor (importante)
npm run dev
```

---

### ❌ Página en blanco o errores en consola

**Síntoma**: La aplicación carga pero muestra página en blanco.

**Causa**: Errores de JavaScript no manejados.

**Solución**:

```bash
# 1. Abrir DevTools (F12) y revisar la consola
# 2. Verificar que el backend esté respondiendo
# 3. Limpiar caché del navegador (Ctrl+Shift+Delete)
# 4. Reiniciar el servidor
npm run dev
```

---

## 📜 Comandos Disponibles

```bash
# ===================================
# DESARROLLO
# ===================================

# Iniciar servidor de desarrollo con hot-reload
npm run dev
# Abre automáticamente: http://localhost:5173

# ===================================
# PRODUCCIÓN
# ===================================

# Compilar para producción
npm run build
# Genera carpeta /dist con archivos optimizados

# Vista previa del build de producción
npm run preview
# Sirve los archivos de /dist

# ===================================
# CALIDAD DE CÓDIGO
# ===================================

# Ejecutar linter (ESLint)
npm run lint
# Detecta errores y problemas de estilo

# Formatear código (Prettier)
npm run format
# Formatea todos los archivos .vue, .js, .css

# Ejecutar lint y format juntos
npm run check

# ===================================
# MANTENIMIENTO
# ===================================

# Limpiar y reinstalar dependencias
npm run clean
# Útil cuando hay problemas con node_modules
```

---

## 👨‍💻 Autor

**Karla Ramírez**  
Desarrolladora Full Stack Trainee  

📧 **Email**: [karla.ramirez@3it.cl](mailto:karla.ramirez@3it.cl)  
💼 **LinkedIn**: [linkedin.com/in/karla-r-4b3802194](https://linkedin.com/in/karla-r-4b3802194)  
🐙 **GitHub**: [github.com/KarlaR3it](https://github.com/KarlaR3it)

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica que:

- [ ] Node.js >= 18.x instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` configurado correctamente
- [ ] Backend corriendo en puertos 8082 y 8083
- [ ] Backend responde a peticiones (curl o navegador)
- [ ] Frontend corriendo en http://localhost:5173
- [ ] No hay errores en la consola del navegador (F12)
- [ ] Puedes ver la página de inicio sin errores
- [ ] Puedes crear/editar/eliminar solicitudes

---

**Última actualización**: Octubre 2025

**Versión del Proyecto**: 1.0.0

---

**¿Preguntas o sugerencias?** No dudes en contactarme.
