<template>
  <Popover ref="menuPanel" class="menu-overlay">
    <div class="menu-content">
      <div class="menu-header p-3 border-bottom-1 surface-border">
        <h3 class="m-0 text-900">Menú Principal</h3>
      </div>
      <ul class="menu-list list-none p-0 m-0">
        <li>
          <a
            @click="selectOption('home')"
            class="menu-item flex align-items-center p-3 cursor-pointer hover:surface-100 transition-colors"
          >
            <i class="pi pi-home mr-3 text-primary"></i>
            <span>Inicio</span>
          </a>
        </li>
        <li>
          <a
            @click="selectOption('solicitudes')"
            class="menu-item flex align-items-center p-3 cursor-pointer hover:surface-100 transition-colors"
          >
            <i class="pi pi-book mr-3 text-primary"></i>
            <span>Solicitudes</span>
          </a>
        </li>
        <li>
          <a
            @click="selectOption('documentos')"
            class="menu-item flex align-items-center p-3 cursor-pointer hover:surface-100 transition-colors"
          >
            <i class="pi pi-file mr-3 text-primary"></i>
            <span>Documentos</span>
          </a>
        </li>
        <li>
          <a
            @click="selectOption('about')"
            class="menu-item flex align-items-center p-3 cursor-pointer hover:surface-100 transition-colors"
          >
            <i class="pi pi-user mr-3 text-primary"></i>
            <span>Acerca del Autor</span>
          </a>
        </li>
      </ul>
    </div>
  </Popover>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Menu",
  emits: ["navigate"],
  setup(props, { emit }) {
    const menuPanel = ref();

    const show = (event) => {
      menuPanel.value.toggle(event);
    };

    const hide = () => {
      menuPanel.value.hide();
    };

    const selectOption = (option) => {
      emit("navigate", option);
      hide();
    };

    // Exponer métodos para el componente padre
    return {
      menuPanel,
      show,
      hide,
      selectOption,
    };
  },
};
</script>

<style scoped>
.menu-content {
  min-width: 200px;
  background: var(--p-surface-0);
  border-radius: 8px;
  overflow: hidden;
}

.menu-header {
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  color: white;
}

.menu-list {
  padding: 0.8rem 0rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.menu-item {
  text-decoration: none;
  color: var(--p-text-color);
  border-radius: 0;
  transition: all 0.2s ease;
  cursor: pointer !important;
}

.menu-item:hover {
  background: var(--p-primary-50);
  color: var(--p-primary-600);
  transform: translateX(4px);
}

.menu-item i {
  font-size: 1.1rem;
  width: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .menu-content {
    min-width: 280px;
    max-width: calc(100vw - 2rem);
  }
}
</style>