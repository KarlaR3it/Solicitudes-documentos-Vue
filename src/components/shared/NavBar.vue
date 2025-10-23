<template>
  <nav class="navbar-mockup">
    <div class="navbar-container">
      <!-- Menú Hamburguesa -->
      <Button
        icon="pi pi-bars"
        severity="secondary"
        text
        class="hamburger-menu"
        @click="toggleMenu"
        aria-label="Abrir menú"
      />

      <!-- Título Centrado -->
      <div class="navbar-center">
        <h1 class="navbar-title">
          <i class="pi pi-briefcase icon-navbar"></i>
          <span class="navbar-title-text"
            >Gestión de Solicitudes y Documentos</span
          >
        </h1>
      </div>

      <!-- Botón de toggle de tema claro/oscuro -->
      <Button
        :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
        severity="secondary"
        text
        class="theme-toggle"
        @click="toggleTheme"
        :aria-label="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
        v-tooltip.bottom="isDarkMode ? 'Modo claro' : 'Modo oscuro'"
      />

      <!-- Componente de menú separado -->
      <Menu ref="menu" />
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import Menu from "./Menu.vue";
import useTheme from "../../composables/useTheme";

export default {
  name: "NavBar",
  components: {
    Menu,
  },
  setup() {
    const menu = ref();
    const { isDarkMode, toggleTheme } = useTheme();

    const toggleMenu = (event) => {
      menu.value.show(event);
    };

    return {
      menu,
      toggleMenu,
      isDarkMode,
      toggleTheme,
    };
  },
};
</script>

<style scoped>
.navbar-mockup {
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%);
  border-bottom: none;
  padding: 1rem;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}

.hamburger-menu.p-button {
  color: white !important;
  background: #312e81 !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 8px !important;
  width: 48px;
  height: 48px;
  transition: all 0.2s ease;
}

.hamburger-menu.p-button:hover {
  background: #1e1b4b !important;
  transform: scale(1.05);
}

.theme-toggle.p-button {
  color: white !important;
  background: #312e81 !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 8px !important;
  width: 48px;
  height: 48px;
  transition: all 0.2s ease;
  margin-left: auto;
}

.theme-toggle.p-button:hover {
  background: #1e1b4b !important;
  transform: scale(1.05);
}

.navbar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.navbar-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-title-text {
  background: linear-gradient(45deg, #ffffff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.icon-navbar {
  font-size: 1.8rem;
  color: #fbbf24;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Responsive: oculta texto en móviles */
@media (max-width: 768px) {
  .navbar-title-text {
    display: none;
  }

  .navbar-title {
    font-size: 1.2rem;
  }

  .icon-navbar {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 480px) {
  .navbar-title {
    font-size: 1rem;
  }

  .icon-navbar {
    font-size: 1.3rem !important;
  }
}
</style>