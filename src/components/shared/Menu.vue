<template>
  <Popover ref="menuPanel" class="menu-overlay">
    <div class="menu-content">
      <div class="menu-header p-3 border-bottom-1 surface-border">
        <h3 class="m-0 text-900">Menú Principal</h3>
      </div>
      <ul class="menu-list list-none p-0 m-0">
        <li>
          <router-link
            to="/"
            @click="hide"
            class="menu-item"
          >
            <i class="pi pi-home mr-3 text-primary"></i>
            <span>Inicio</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/solicitudes"
            @click="hide"
            class="menu-item"
          >
            <i class="pi pi-book mr-3 text-primary"></i>
            <span>Solicitudes</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/documentos"
            @click="hide"
            class="menu-item"
          >
            <i class="pi pi-file mr-3 text-primary"></i>
            <span>Documentos</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            @click="hide"
            class="menu-item"
          >
            <i class="pi pi-user mr-3 text-primary"></i>
            <span>Acerca del Autor</span>
          </router-link>
        </li>
      </ul>
    </div>
  </Popover>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Menu",
  setup() {
    const menuPanel = ref();

    const show = (event) => {
      menuPanel.value.toggle(event);
    };

    const hide = () => {
      menuPanel.value.hide();
    };

    // Exponer métodos para el componente padre
    return {
      menuPanel,
      show,
      hide,
    };
  },
};
</script>

<style>
.menu-content {
  min-width: 200px;
  background: var(--p-surface-0);
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
}

.menu-header {
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  color: white;
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-list {
  padding: 0.8rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.menu-item {
  text-decoration: none;
  color: var(--p-text-color);
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer !important;
  display: flex;
  align-items: center;
  padding: 0.65rem 1rem !important;
}

.menu-item:hover:not(.router-link-active) {
  background: var(--p-surface-100);
  color: var(--p-primary-color);
  transform: translateX(4px);
}

/* Estilo para el link activo */
.menu-item.router-link-active {
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  color: white;
  font-weight: 600;
  box-shadow: none;
}


.menu-item i {
  font-size: 1.1rem;
  width: 15px;
  margin-right: 0.75rem;
}

/* Responsive */
@media (max-width: 768px) {
  .menu-content {
    min-width: 280px;
    max-width: calc(100vw - 2rem);
  }
}
</style>