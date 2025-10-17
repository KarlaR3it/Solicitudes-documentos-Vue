<template>
  <Dialog
    :visible="visible"
    :modal="true"
    :closable="true"
    :style="{ width: '600px' }"
    @update:visible="$emit('close')"
  >
    <template #header>
      <div class="dialog-header">
        <i class="pi pi-eye"></i>
        <span>Detalle de Documento</span>
      </div>
    </template>

    <div v-if="documento" class="documento-detail">
      <div class="detail-section">
        <h3 class="section-title">Información Básica</h3>

        <div class="detail-field">
          <label>ID</label>
          <span>{{ documento.id }}</span>
        </div>

        <div class="detail-field">
          <label>Solicitud ID</label>
          <span>{{ documento.solicitudId }}</span>
        </div>

        <div class="detail-field">
          <label>Nombre del Archivo</label>
          <span class="file-name">
            <i :class="`pi ${getExtensionIcon(documento.extension)}`"></i>
            {{ documento.nombreArchivo }}.{{ documento.extension }}
          </span>
        </div>

        <div class="detail-field">
          <label>Extensión</label>
          <Tag :value="documento.extension.toUpperCase()" :severity="getExtensionSeverity(documento.extension)" />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <BaseButton
          label="Cerrar"
          icon="pi pi-times"
          variant="secondary"
          outlined
          @click="$emit('close')"
        />
        <BaseButton
          label="Editar"
          icon="pi pi-pencil"
          variant="warning"
          @click="$emit('edit', documento)"
        />
        <BaseButton
          label="Eliminar"
          icon="pi pi-trash"
          variant="danger"
          @click="$emit('delete', documento)"
        />
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import Tag from "primevue/tag";
import BaseButton from "../common/BaseButton.vue";

export default {
  components: {
    Dialog,
    Tag,
    BaseButton,
  },
  props: {
    visible: Boolean,
    documento: Object,
  },
  emits: ["close", "edit", "delete"],
  setup() {
    const getExtensionIcon = (extension) => {
      const icons = {
        pdf: "pi-file-pdf",
        docx: "pi-file-word",
        jpg: "pi-image",
        png: "pi-image",
      };
      return icons[extension] || "pi-file";
    };

    const getExtensionSeverity = (extension) => {
      const severities = {
        pdf: "danger",
        docx: "info",
        jpg: "success",
        png: "success",
      };
      return severities[extension] || "secondary";
    };

    return {
      getExtensionIcon,
      getExtensionSeverity,
    };
  },
};
</script>

<style scoped>
.dialog-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--brand-primary);
  font-size: 1.3rem;
  font-weight: 600;
}

.documento-detail {
  padding: 1rem 0;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.section-title {
  color: var(--brand-primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--brand-primary);
}

.detail-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--p-surface-border);
}

.detail-field:last-child {
  border-bottom: none;
}

.detail-field label {
  font-weight: 600;
  color: var(--p-text-color);
}

.detail-field span {
  color: var(--p-text-secondary-color);
}

.file-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.file-name i {
  font-size: 1.2rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .detail-field {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
