<template>
  <div class="app-container min-h-screen bg-surface-50">
    <NavBar @navigate="handleNavigationRequest" />
    <main class="py-4">
      <!-- Vista Home por defecto -->
      <Home v-if="currentView === 'home'" />

      <!-- Componente Solicitudes dinámico -->
      <div v-else-if="currentView === 'solicitudes'">
        <SolicitudForm
          :showForm="showForm"
          :editMode="editMode"
          :solicitudToEdit="solicitudToEdit"
          :openCloseForm="openCloseForm"
          :reloadSolicitudes="reloadSolicitudes"
        />
        <SolicitudList
          :solicitudes="solicitudes"
          :reloadSolicitudes="reloadSolicitudes"
          :showForm="showForm"
          :openCloseForm="openCreateMode"
          @edit-solicitud="handleEditSolicitud"
        />
      </div>
    </main>
    <Toast />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { NavBar } from "./components/shared";
import Home from "./views/Home.vue";
import { SolicitudForm, SolicitudList } from "./components/solicitudes";
import useFormSolicitud from "./composables/useFormSolicitud";
import { useSolicitudesStore } from "./stores/solicitudes.store";

export default {
  name: "App",
  components: {
    NavBar,
    Home,
    SolicitudForm,
    SolicitudList,
  },
  setup() {
    // ============================================
    // PINIA STORE (Estado global)
    // ============================================
    const solicitudesStore = useSolicitudesStore();
    const { solicitudes, isLoading } = storeToRefs(solicitudesStore);
    
    // ============================================
    // ESTADO LOCAL (Solo UI)
    // ============================================
    let currentView = ref("home"); // Vista por defecto
    const { showForm, editMode, solicitudToEdit, openCloseForm, openCreateMode, openEditMode } = useFormSolicitud();

    // ============================================
    // MÉTODOS
    // ============================================
    const reloadSolicitudes = async () => {
      await solicitudesStore.fetchSolicitudes();
    };

    const handleEditSolicitud = (solicitud) => {
      // Abrir formulario en modo edición con los datos de la solicitud
      openEditMode(solicitud);
    };

    // Lógica de navegación simplificada
    const handleNavigationRequest = async (targetView) => {
      // Navegación directa sin confirmación
      currentView.value = targetView;

      // Si va a solicitudes, cargar datos y cerrar formulario
      if (targetView === "solicitudes") {
        await solicitudesStore.fetchSolicitudes();
        if (showForm.value) {
          openCloseForm(); // Cerrar formulario para mostrar lista limpia
        }
      }
    };

    // ============================================
    // LIFECYCLE HOOKS
    // ============================================
    onMounted(() => {
      // Cargar solicitudes al iniciar la app
      solicitudesStore.fetchSolicitudes();
    });

    return {
      // Estado del store
      solicitudes,
      isLoading,
      // Estado local (formulario)
      showForm,
      editMode,
      solicitudToEdit,
      openCloseForm,
      openCreateMode,
      currentView,
      // Métodos
      reloadSolicitudes,
      handleEditSolicitud,
      handleNavigationRequest,
    };
  },
};
</script>

<style>
.app-container {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

/* Los estilos globales de PrimeVue están en src/styles/primevue-global.css */

/* Responsive utilities adicionales */
@media (max-width: 768px) {
  .app-container {
    padding: 0;
  }
}
</style>
