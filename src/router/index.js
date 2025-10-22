import { createRouter, createWebHistory } from 'vue-router';

// Importar vistas
import Home from '../views/Home.vue';

/**
 * Configuración de rutas de la aplicación
 * Usa lazy loading para optimizar el bundle inicial
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Inicio - Sistema de Solicitudes'
    }
  },
  {
    path: '/solicitudes',
    name: 'Solicitudes',
    // Lazy loading: solo carga cuando se navega a esta ruta
    component: () => import('../views/SolicitudesView.vue'),
    meta: {
      title: 'Solicitudes - Sistema de Solicitudes'
    }
  },
  {
    path: '/documentos',
    name: 'Documentos',
    component: () => import('../views/DocumentosView.vue'),
    meta: {
      title: 'Documentos - Sistema de Solicitudes'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'Acerca del Autor - Sistema de Solicitudes'
    }
  },
  {
    // Ruta 404 - Redirige al home si la ruta no existe
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll al inicio al cambiar de ruta
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

// Guard global para actualizar el título de la página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Sistema de Solicitudes';
  next();
});

export default router;
