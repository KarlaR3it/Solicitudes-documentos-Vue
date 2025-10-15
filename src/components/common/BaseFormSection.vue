<template>
  <div class="form-section">
    <h4 class="section-title">{{ title }}</h4>
    <slot />
  </div>
</template>

<script>
export default {
  name: "BaseFormSection",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.form-section {
  padding: 1.5rem;
  border: 1px solid var(--p-surface-border);
  border-radius: 8px;
  background: var(--p-surface-50);
  margin-bottom: 1rem;
}

.section-title {
  color: var(--p-primary-color);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--p-primary-color);
}

/* Responsive */
@media (max-width: 768px) {
  .form-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.1rem;
  }
}
</style>