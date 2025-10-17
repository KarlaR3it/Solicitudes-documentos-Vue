<template>
  <div class="documento-list-container">
    <DocumentoForm
      :showForm="showForm"
      :openCloseForm="openCloseForm"
      :editMode="editMode"
      :documentoToEdit="documentoToEdit"
    />

    <div class="list-header">
      <h2 class="list-title">
        <i class="pi pi-file"></i>
        Gestión de Documentos
      </h2>
      <BaseButton
        v-if="!documentosStore.loading && documentosStore.documentos.length > 0"
        label="Nuevo Documento"
        icon="pi pi-plus"
        @click="openCreateForm"
      />
    </div>

    <div v-if="documentosStore.loading" class="loading-container">
      <ProgressSpinner />
    </div>

    <div v-else-if="documentosStore.documentos.length === 0" class="empty-state">
      <i class="pi pi-inbox empty-icon"></i>
      <p class="empty-text">No hay documentos registrados</p>
      <BaseButton
        label="Crear Primer Documento"
        icon="pi pi-plus"
        @click="openCreateForm"
      />
    </div>

    <div v-else class="documentos-grid">
      <Card
        v-for="documento in documentosStore.documentos"
        :key="documento.id"
        class="documento-card"
      >
        <template #header>
          <div class="card-header">
            <FileIcon :extension="documento.extension" />
          </div>
        </template>
        <template #title>
          <div class="documento-title">
            {{ documento.nombre_archivo || documento.nombreArchivo }}.{{ documento.extension }}
          </div>
        </template>
        <template #subtitle>
          <div class="documento-subtitle">
            <div><strong>Solicitud ID:</strong> {{ documento.solicitud?.solicitud_id || documento.solicitud_id || documento.solicitudId }}</div>
            <div><strong>Título:</strong> {{ documento.solicitud?.titulo || getSolicitudTitulo(documento.solicitud_id || documento.solicitudId) }}</div>
            <div><strong>Área:</strong> {{ documento.solicitud?.area || 'N/A' }}</div>
          </div>
        </template>
        <template #footer>
          <div class="card-actions">
            <BaseButton
              icon="pi pi-eye"
              variant="info"
              text
              @click="viewDocumento(documento)"
            />
            <BaseButton
              icon="pi pi-pencil"
              variant="warning"
              text
              @click="editDocumento(documento)"
            />
            <BaseButton
              icon="pi pi-trash"
              variant="danger"
              text
              @click="confirmDelete(documento)"
            />
          </div>
        </template>
      </Card>
    </div>

    <DocumentoDetail
      :visible="showDetail"
      :documento="selectedDocumento"
      @close="closeDetail"
      @edit="editDocumento"
      @delete="confirmDelete"
    />

    <Dialog
      v-model:visible="showDeleteDialog"
      header="Confirmar Eliminación"
      :modal="true"
      :style="{ width: '450px' }"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: var(--red-500)"></i>
        <span>
          ¿Estás seguro de eliminar el documento
          <strong>{{ documentoToDelete?.nombre_archivo || documentoToDelete?.nombreArchivo }}.{{ documentoToDelete?.extension }}</strong>?
        </span>
      </div>
      <template #footer>
        <BaseButton
          label="Cancelar"
          icon="pi pi-times"
          variant="secondary"
          outlined
          @click="showDeleteDialog = false"
        />
        <BaseButton
          label="Eliminar"
          icon="pi pi-trash"
          variant="danger"
          @click="deleteDocumento"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useDocumentosStore } from "@/stores/documentos.store";
import { useSolicitudesStore } from "@/stores/solicitudes.store";
import DocumentoForm from "./DocumentoForm.vue";
import DocumentoDetail from "./DocumentoDetail.vue";
import BaseButton from "../common/BaseButton.vue";
import FileIcon from "../common/FileIcon.vue";
import Card from "primevue/card";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";

export default {
  components: {
    DocumentoForm,
    DocumentoDetail,
    BaseButton,
    FileIcon,
    Card,
    Dialog,
    ProgressSpinner,
  },
  setup() {
    const toast = useToast();
    const documentosStore = useDocumentosStore();
    const solicitudesStore = useSolicitudesStore();

    const showForm = ref(false);
    const editMode = ref(false);
    const documentoToEdit = ref(null);
    const showDetail = ref(false);
    const selectedDocumento = ref(null);
    const showDeleteDialog = ref(false);
    const documentoToDelete = ref(null);

    const openCloseForm = () => {
      showForm.value = !showForm.value;
      if (!showForm.value) {
        editMode.value = false;
        documentoToEdit.value = null;
      }
    };

    const openCreateForm = () => {
      editMode.value = false;
      documentoToEdit.value = null;
      showForm.value = true;
    };

    const viewDocumento = (documento) => {
      selectedDocumento.value = documento;
      showDetail.value = true;
    };

    const closeDetail = () => {
      showDetail.value = false;
      selectedDocumento.value = null;
    };

    const editDocumento = (documento) => {
      documentoToEdit.value = documento;
      editMode.value = true;
      showForm.value = true;
      showDetail.value = false;
    };

    const confirmDelete = (documento) => {
      documentoToDelete.value = documento;
      showDeleteDialog.value = true;
      showDetail.value = false;
    };

    const deleteDocumento = async () => {
      try {
        await documentosStore.deleteDocumento(documentoToDelete.value.id);

        const nombreArchivo = documentoToDelete.value.nombre_archivo || documentoToDelete.value.nombreArchivo;
        toast.add({
          severity: "success",
          summary: "Documento eliminado",
          detail: `El documento "${nombreArchivo}.${documentoToDelete.value.extension}" fue eliminado exitosamente`,
          life: 3000,
        });

        showDeleteDialog.value = false;
        documentoToDelete.value = null;
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudo eliminar el documento",
          life: 3000,
        });
      }
    };

    const getSolicitudTitulo = (solicitudId) => {
      const solicitud = solicitudesStore.solicitudes.find(s => s.id === solicitudId);
      return solicitud ? solicitud.titulo : 'Sin título';
    };

    onMounted(async () => {
      try {
        // Cargar solicitudes primero para tener los títulos disponibles
        await solicitudesStore.fetchSolicitudes();
        console.log('Solicitudes cargadas:', solicitudesStore.solicitudes);
        
        // Luego cargar documentos
        await documentosStore.fetchDocumentos();
        console.log('Documentos cargados:', documentosStore.documentos);
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudieron cargar los documentos",
          life: 3000,
        });
      }
    });

    return {
      documentosStore,
      solicitudesStore,
      showForm,
      editMode,
      documentoToEdit,
      showDetail,
      selectedDocumento,
      showDeleteDialog,
      documentoToDelete,
      openCloseForm,
      openCreateForm,
      viewDocumento,
      closeDetail,
      editDocumento,
      confirmDelete,
      deleteDocumento,
      getSolicitudTitulo,
    };
  },
};
</script>

<style scoped>
.documento-list-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.list-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--brand-primary);
  font-size: 1.8rem;
  margin: 0;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  color: var(--p-surface-400);
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.2rem;
  color: var(--p-surface-600);
  margin-bottom: 2rem;
}

.documentos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.documento-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.documento-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%);
}

.card-header i {
  font-size: 3rem;
  color: white;
}

.documento-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--brand-primary);
  word-break: break-word;
}

.documento-subtitle {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: var(--p-surface-600);
}

.documento-subtitle strong {
  color: var(--p-surface-700);
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.confirmation-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .documento-list-container {
    padding: 1rem;
  }

  .list-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .documentos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
