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

      <!-- Componente de menú separado -->
      <Menu ref="menu" @navigate="handleNavigation" />
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import Menu from "./Menu.vue";

export default {
  name: "NavBar",
  components: {
    Menu,
  },
  emits: ["navigate"],
  setup(props, { emit }) {
    const menu = ref();

    const toggleMenu = (event) => {
      menu.value.show(event);
    };

    const handleNavigation = (option) => {
      emit("navigate", option);
    };

    return {
      menu,
      toggleMenu,
      handleNavigation,
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

.hamburger-menu {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  transition: all 0.2s ease;
}

.hamburger-menu:hover {
  background: rgba(255, 255, 255, 0.2) !important;
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

.hamburger-menu {
  color: white !important;
  padding: 0.5rem !important;
  transition: transform 0.2s ease;
}

.hamburger-menu:hover {
  transform: scale(1.1);
}

.navbar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.navbar-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  color: white;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.menu-content {
  min-width: 250px;
}

.menu-header {
  background: var(--p-surface-50);
}

.menu-list {
  background: var(--p-surface-0);
}

.menu-item {
  border-bottom: 1px solid var(--p-surface-border);
  text-decoration: none;
  color: var(--p-text-color);
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: var(--p-primary-50) !important;
  color: var(--p-primary-600) !important;
}

.menu-item i {
  width: 1.2rem;
}

/* Responsive: oculta texto en móviles */
@media (max-width: 768px) {
  .navbar-title-text {
    display: none;
  }

  .navbar-title {
    font-size: 1.2rem;
  }

  .navbar-icon {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 480px) {
  .navbar-title {
    font-size: 1rem;
  }

  .navbar-icon {
    font-size: 1.3rem !important;
  }
}

.menu-content {
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>