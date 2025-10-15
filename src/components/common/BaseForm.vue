<template>
  <div
    class="base-form-container max-w-screen-xl mx-auto px-3"
    :class="{ open: visible }"
  >
    <Card v-if="visible" class="base-form-card">
      <template #title>
        <div class="flex align-items-center gap-2">
          <i :class="titleIcon" class="text-primary"></i>
          {{ title }}
        </div>
      </template>

      <template #content>
        <form @submit.prevent="handleSubmit" class="flex flex-column gap-4">
          <!-- Slot para contenido del formulario -->
          <slot />

          <!-- Footer con botones -->
          <div class="flex gap-2 justify-content-end">
            <BaseButton
              label="Cancelar"
              icon="pi pi-times"
              variant="secondary"
              outlined
              @click="$emit('cancel')"
            />
            <BaseButton
              type="submit"
              :label="submitLabel"
              :icon="submitIcon"
              variant="primary"
              :disabled="!isValid"
              :loading="loading"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "BaseForm",
  components: {
    BaseButton,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    titleIcon: {
      type: String,
      default: "pi pi-file-plus",
    },
    submitLabel: {
      type: String,
      default: "Guardar",
    },
    submitIcon: {
      type: String,
      default: "pi pi-check",
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["submit", "cancel"],
  methods: {
    handleSubmit() {
      if (this.isValid && !this.loading) {
        this.$emit("submit");
      }
    },
  },
};
</script>

<style scoped>
.base-form-container {
  margin-top: 1rem;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
}

.base-form-container.open {
  height: auto;
}

.base-form-card {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .base-form-container {
    padding: 0.5rem;
  }
}
</style>