<template>
  <Button
    :type="type"
    :label="label"
    :icon="icon"
    :severity="severity"
    :disabled="disabled"
    :loading="loading"
    :class="buttonClass"
    @click="handleClick"
  >
    <slot />
  </Button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button",
    },
    variant: {
      type: String,
      default: "primary",
      validator: (value) =>
        [
          "primary",
          "secondary",
          "success",
          "info",
          "warning",
          "danger",
          "help",
          "contrast",
        ].includes(value),
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["small", "medium", "large"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  computed: {
    severity() {
      return this.variant;
    },
    buttonClass() {
      const classes = [];

      // Tamaño
      if (this.size === "small") classes.push("p-button-sm");
      if (this.size === "large") classes.push("p-button-lg");

      // Outlined
      if (this.outlined) classes.push("p-button-outlined");

      // Ancho completo
      if (this.fullWidth) classes.push("w-full");

      // Variant específico para botón primario
      if (this.variant === "primary") classes.push("btn-primary");

      return classes.join(" ");
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit("click", event);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales si necesitas personalización extra */
.btn-primary {
  background: var(--brand-primary) !important;
  border-color: var(--brand-primary) !important;
}

.btn-primary:hover {
  background: color-mix(in srgb, var(--brand-primary) 90%, black) !important;
  border-color: color-mix(in srgb, var(--brand-primary) 90%, black) !important;
}
</style>