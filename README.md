# 🚀 Sistema de Gestión de Solicitudes y Documentos

> **Aplicación web moderna** para la gestión integral de solicitudes de trabajo y documentos asociados

[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0-FFD859?logo=pinia)](https://pinia.vuejs.org/)
[![PrimeVue](https://img.shields.io/badge/PrimeVue-4.4-007ACC)](https://primevue.org/)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Autor](#-autor)

---

## ✨ Características

### Gestión de Solicitudes
- ✅ **CRUD completo** - Crear, leer, actualizar y eliminar solicitudes
- ✅ **Formularios inteligentes** - Validación en tiempo real
- ✅ **Vista detallada** - Información completa de cada solicitud
- ✅ **Filtrado y paginación** - DataTable con búsqueda avanzada
- ✅ **Estados visuales** - Tags de colores según el estado

### Gestión de Documentos
- ✅ **CRUD completo** - Administración de documentos
- ✅ **Iconos por tipo** - Visualización según extensión (PDF, DOCX, PNG, JPG)
- ✅ **Vinculación** - Documentos asociados a solicitudes
- ✅ **Vista previa** - Información detallada de cada documento

### Interfaz de Usuario
- ✅ **Diseño moderno** - UI limpia y profesional
- ✅ **Responsive** - Funciona en móviles, tablets y desktop
- ✅ **Tema personalizado** - Gradientes y colores corporativos
- ✅ **Navegación intuitiva** - Menú hamburguesa y navbar
- ✅ **Notificaciones** - Toast messages para feedback

### Arquitectura
- ✅ **Estado centralizado** - Pinia para gestión de estado
- ✅ **Componentes reutilizables** - BaseButton, BaseForm, BaseField
- ✅ **Composables** - Lógica compartida y reutilizable
- ✅ **Normalización de datos** - Manejo de snake_case y camelCase
- ✅ **Estilos compartidos** - CSS modular y mantenible

---

## 📸 Capturas de Pantalla

### Vista Principal
![Home](docs/screenshots/home.png)

### Gestión de Solicitudes
![Solicitudes](docs/screenshots/solicitudes.png)

### Gestión de Documentos
![Documentos](docs/screenshots/documentos.png)

### Perfil del Autor
![About](docs/screenshots/about.png)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.x ([Descargar](https://nodejs.org/))
- **npm** >= 9.x (viene con Node.js)
- **Backend API** corriendo en:
  - Solicitudes: `http://localhost:8082`
  - Documentos: `http://localhost:8083`

### Verificar instalación

```bash
node --version   # Debe mostrar v18.x o superior
npm --version    # Debe mostrar 9.x o superior
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/KarlaR3it/Solicitudes-documentos-Vue.git
cd Solicitudes-documentos-Vue
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

### 4. Abrir en el navegador

```
http://localhost:5173
```

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (opcional):

```env
# URLs del backend
VITE_API_SOLICITUDES_URL=http://localhost:8082
VITE_API_DOCUMENTOS_URL=http://localhost:8083
```

### Configuración del Backend

Asegúrate de que los servicios backend estén corriendo:

```bash
# Servicio de Solicitudes (Puerto 8082)
# Servicio de Documentos (Puerto 8083)
```

---

## 📁 Estructura del Proyecto

```
solicitudes-vue/
├── src/
│   ├── assets/                  # Recursos estáticos
│   │   ├── profile-photo.jpeg   # Foto de perfil
│   │   └── styles/              # Estilos compartidos
│   │       └── dialog-buttons.css
│   ├── components/
│   │   ├── common/              # Componentes base reutilizables
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseField.vue
│   │   │   ├── BaseForm.vue
│   │   │   ├── BaseFormSection.vue
│   │   │   ├── BaseModal.vue
│   │   │   └── FileIcon.vue
│   │   ├── shared/              # Componentes compartidos
│   │   │   ├── NavBar.vue
│   │   │   ├── Menu.vue
│   │   │   └── Footer.vue
│   │   ├── solicitudes/         # Módulo de solicitudes
│   │   │   ├── SolicitudForm.vue
│   │   │   ├── SolicitudList.vue
│   │   │   └── SolicitudDetail.vue
│   │   ├── documentos/          # Módulo de documentos
│   │   │   ├── DocumentoForm.vue
│   │   │   ├── DocumentoList.vue
│   │   │   └── DocumentoDetail.vue
│   │   └── About.vue            # Perfil del autor
│   ├── composables/             # Lógica reutilizable
│   │   └── useFormSolicitud.js
│   ├── stores/                  # Estado global (Pinia)
│   │   ├── solicitudes.store.js
│   │   └── documentos.store.js
│   ├── utils/                   # Utilidades
│   │   └── normalizers.js       # Normalización de datos
│   ├── views/                   # Vistas principales
│   │   └── Home.vue
│   ├── styles/                  # Estilos globales
│   │   └── primevue-global.css
│   ├── App.vue                  # Componente raíz
│   └── main.js                  # Punto de entrada
├── public/                      # Assets públicos
├── index.html                   # HTML principal
├── vite.config.js               # Configuración Vite
├── package.json                 # Dependencias
└── README.md                    # Este archivo
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **[Vue 3](https://vuejs.org/)** (v3.5) - Framework JavaScript progresivo con Composition API
- **[Vite](https://vitejs.dev/)** (v7.1) - Build tool ultra-rápido con HMR
- **[Pinia](https://pinia.vuejs.org/)** (v3.0) - State management oficial de Vue

### UI/UX
- **[PrimeVue](https://primevue.org/)** (v4.4) - Librería de componentes UI empresariales
- **[PrimeIcons](https://primevue.org/icons)** - Conjunto de iconos
- **[Aura Theme](https://primevue.org/theming/)** - Tema moderno y personalizable

### Utilidades
- **[Axios](https://axios-http.com/)** - Cliente HTTP para comunicación con backend
- **[Moment.js](https://momentjs.com/)** - Manejo y formateo de fechas

### DevOps
- **[ESLint](https://eslint.org/)** - Linter para código JavaScript
- **[Prettier](https://prettier.io/)** - Formateador de código

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo (puerto 5173)

# Producción
npm run build        # Compilar para producción
npm run preview      # Vista previa del build de producción

# Calidad de código
npm run lint         # Ejecutar linter
npm run format       # Formatear código
```

---

## 🎯 Funcionalidades Principales

### 1. Gestión de Solicitudes

#### Crear Solicitud
- Formulario completo con validaciones
- Campos: título, descripción, área, país, localización, estado
- Detalles del puesto: vacantes, experiencia, educación
- Condiciones laborales: salario, modalidad, tipo de servicio

#### Listar Solicitudes
- DataTable con paginación
- Búsqueda y filtrado
- Ordenamiento por columnas
- Vista rápida con tags de estado

#### Ver Detalle
- Modal con información completa
- Secciones organizadas
- Formato de moneda y fechas
- Acciones: editar y eliminar

### 2. Gestión de Documentos

#### Crear Documento
- Vinculación con solicitudes
- Soporte para múltiples formatos
- Validación de campos

#### Listar Documentos
- Iconos visuales por tipo de archivo
- Información de solicitud asociada
- Acciones rápidas

#### Ver Detalle
- Información del documento
- Extensión con tag de color
- Acciones: editar y eliminar

### 3. Perfil del Autor

- Información personal y profesional
- Habilidades técnicas organizadas
- Enlaces a redes sociales
- Intereses y áreas de especialización

---

## 🔄 Flujo de Datos

```
┌─────────────┐
│   Backend   │
│  (API REST) │
└──────┬──────┘
       │
       │ HTTP (Axios)
       │
┌──────▼──────┐
│   Stores    │
│   (Pinia)   │
└──────┬──────┘
       │
       │ State
       │
┌──────▼──────┐
│ Components  │
│    (Vue)    │
└─────────────┘
```

---

## 🎨 Guía de Estilos

### Colores Principales
- **Primary**: `#4f46e5` (Índigo)
- **Secondary**: `#06b6d4` (Cyan)
- **Success**: `#10b981` (Verde)
- **Warning**: `#f59e0b` (Naranja)
- **Danger**: `#ef4444` (Rojo)

### Gradientes
```css
background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to backend"
```bash
# Verificar que los servicios backend estén corriendo
# Solicitudes: http://localhost:8082
# Documentos: http://localhost:8083
```

### Error: "Port 5173 already in use"
```bash
# Cambiar puerto en vite.config.js
export default defineConfig({
  server: { port: 3000 }
})
```

### Error: "Module not found"
```bash
# Limpiar y reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Recursos Adicionales

- [Documentación Vue 3](https://vuejs.org/guide/introduction.html)
- [Documentación Pinia](https://pinia.vuejs.org/introduction.html)
- [Documentación PrimeVue](https://primevue.org/setup)
- [Guía de Vite](https://vitejs.dev/guide/)

---

## 👨‍💻 Autor

**Karla Ramírez**  
Desarrolladora Full Stack Trainee  
📧 [karla.ramirez@3it.cl](mailto:karla.ramirez@3it.cl)  
💼 [LinkedIn](https://linkedin.com/in/karla-r-4b3802194)  
🐙 [GitHub](https://github.com/KarlaR3it)

---

## 📄 Licencia

Este proyecto es de uso académico y profesional.

---

## 🙏 Agradecimientos

- Comunidad Vue.js por el excelente framework
- PrimeVue por los componentes UI de calidad
- Equipo de 3IT por el apoyo y mentoría

---

**¿Preguntas o sugerencias?** No dudes en contactarme.

---

**Última actualización**: Octubre 2025
