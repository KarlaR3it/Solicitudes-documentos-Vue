<template>
  <div class="field" :class="{ [`col-${cols}`]: cols }">
    <label class="block font-semibold mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <slot />
    <small v-if="hint" class="text-muted">{{ hint }}</small>
    <small v-if="error" class="text-red-500">{{ error }}</small>
  </div>
</template>

<script>
export default {
  name: "BaseField",
  props: {
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    cols: {
      type: [String, Number],
      default: null,
    },
    hint: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.text-muted {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.text-red-500 {
  color: #ef4444;
}
</style>