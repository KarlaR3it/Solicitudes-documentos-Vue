<template>
  <Dialog
    v-model:visible="isVisible"
    :header="header"
    :modal="true"
    :style="{ width: '450px' }"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: var(--red-500)"></i>
      <span v-html="message"></span>
    </div>
    <template #footer>
      <BaseButton
        :label="cancelLabel"
        icon="pi pi-times"
        variant="secondary"
        outlined
        @click="handleCancel"
      />
      <BaseButton
        :label="confirmLabel"
        icon="pi pi-trash"
        variant="danger"
        @click="handleConfirm"
      />
    </template>
  </Dialog>
</template>

<script>
import { computed } from 'vue';
import Dialog from 'primevue/dialog';
import BaseButton from './BaseButton.vue';

export default {
  name: 'BaseConfirm',
  components: {
    Dialog,
    BaseButton,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: 'Confirmar Eliminación',
    },
    message: {
      type: String,
      required: true,
    },
    cancelLabel: {
      type: String,
      default: 'Cancelar',
    },
    confirmLabel: {
      type: String,
      default: 'Eliminar',
    },
  },
  emits: ['update:visible', 'confirm', 'cancel'],
  setup(props, { emit }) {
    const isVisible = computed({
      get: () => props.visible,
      set: (value) => emit('update:visible', value),
    });

    const handleConfirm = () => {
      emit('confirm');
      emit('update:visible', false);
    };

    const handleCancel = () => {
      emit('cancel');
      emit('update:visible', false);
    };

    return {
      isVisible,
      handleConfirm,
      handleCancel,
    };
  },
};
</script>

<style scoped>
.confirmation-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}

.confirmation-content i {
  flex-shrink: 0;
}

.confirmation-content span {
  flex: 1;
  line-height: 1.5;
}
</style>
