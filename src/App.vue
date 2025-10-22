<template>
  <div class="app-container">
    <NavBar />
    <main class="main-content">
      <!-- Vue Router View: renderiza el componente según la ruta -->
      <router-view />
    </main>
    <Footer />
    <Toast />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { NavBar, Footer } from "./components/shared";
import useTheme from "./composables/useTheme";
import { useSolicitudesStore } from "./stores/solicitudes.store";

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
  setup() {
    // Inicializar el tema (modo claro/oscuro)
    useTheme();
    
    // Precargar solicitudes al iniciar la app
    const solicitudesStore = useSolicitudesStore();
    
    onMounted(() => {
      solicitudesStore.fetchSolicitudes();
    });
  },
};
</script>

<style>
.app-container {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--p-surface-50);
}

.main-content {
  flex: 1;
  padding: 0;
}

/* Los estilos globales de PrimeVue están en src/styles/primevue-global.css */

/* Responsive utilities adicionales */
@media (max-width: 768px) {
  .app-container {
    padding: 0;
  }

  .main-content {
    padding: 0;
  }
}
</style>
