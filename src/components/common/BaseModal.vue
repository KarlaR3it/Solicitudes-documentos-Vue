<template>
  <Dialog
    :visible="visible"
    @update:visible="updateVisible"
    :modal="true"
    :closable="closable"
    :dismissableMask="dismissableMask"
    :closeOnEscape="closeOnEscape"
    :draggable="draggable"
    :resizable="resizable"
    :class="modalClass"
    :style="modalStyle"
  >
    <!-- Header personalizable -->
    <template #header v-if="title || $slots.header">
      <slot name="header">
        <div class="flex align-items-center gap-2">
          <i v-if="icon" :class="icon"></i>
          <span class="font-semibold">{{ title }}</span>
        </div>
      </slot>
    </template>

    <!-- Contenido principal -->
    <div class="modal-content">
      <slot />
    </div>

    <!-- Footer personalizable -->
    <template #footer v-if="showFooter || $slots.footer">
      <slot name="footer">
        <div class="flex justify-content-end gap-2">
          <BaseButton
            v-if="showCancelButton"
            :label="cancelLabel"
            icon="pi pi-times"
            variant="secondary"
            outlined
            @click="handleCancel"
          />
          <BaseButton
            v-if="showConfirmButton"
            :label="confirmLabel"
            :icon="confirmIcon"
            :variant="confirmVariant"
            :loading="loading"
            @click="handleConfirm"
          />
        </div>
      </slot>
    </template>
  </Dialog>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "BaseModal",
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
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) =>
        ["small", "medium", "large", "fullscreen"].includes(value),
    },
    closable: {
      type: Boolean,
      default: true,
    },
    dismissableMask: {
      type: Boolean,
      default: true,
    },
    closeOnEscape: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    resizable: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    cancelLabel: {
      type: String,
      default: "Cancelar",
    },
    confirmLabel: {
      type: String,
      default: "Confirmar",
    },
    confirmIcon: {
      type: String,
      default: "pi pi-check",
    },
    confirmVariant: {
      type: String,
      default: "primary",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible", "confirm", "cancel", "close"],
  computed: {
    modalClass() {
      const classes = [`base-modal`, `modal-${this.size}`];
      return classes.join(" ");
    },
    modalStyle() {
      const styles = {};

      switch (this.size) {
        case "small":
          styles.width = "400px";
          break;
        case "medium":
          styles.width = "600px";
          break;
        case "large":
          styles.width = "90vw";
          styles.maxWidth = "1000px";
          break;
        case "fullscreen":
          styles.width = "95vw";
          styles.height = "95vh";
          break;
      }

      return styles;
    },
  },
  methods: {
    updateVisible(value) {
      this.$emit("update:visible", value);
      if (!value) {
        this.$emit("close");
      }
    },
    handleConfirm() {
      this.$emit("confirm");
    },
    handleCancel() {
      this.$emit("cancel");
      this.updateVisible(false);
    },
  },
};
</script>

<style scoped>
.base-modal {
  border-radius: 12px;
  overflow: hidden;
}

.modal-content {
  min-height: 100px;
}

/* Responsive */
@media (max-width: 768px) {
  .base-modal {
    margin: 1rem;
  }
}
</style>