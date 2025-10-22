<template>
  <div class="max-w-screen-xl mx-auto px-3">
    <DocumentoForm
      :showForm="showForm"
      :openCloseForm="openCloseForm"
      :editMode="editMode"
      :documentoToEdit="documentoToEdit"
    />

    <!-- Header con título y botón -->
    <div class="list-header">
      <h2 class="list-title">
        <i class="pi pi-file"></i>
        Lista de Documentos
      </h2>
      <BaseButton
        v-if="documentosStore.documentos.length > 0"
        label="Nuevo Documento"
        icon="pi pi-plus"
        variant="success"
        @click="openCreateForm"
      />
    </div>

    <Card>
      <template #content>
        <div v-if="documentosStore.loading" class="loading-container">
          <ProgressSpinner />
        </div>

        <div v-else-if="documentosStore.documentos.length === 0" class="text-center py-4">
          <i class="pi pi-inbox text-4xl text-400 mb-3 block"></i>
          <p class="text-600 text-lg">No hay documentos registrados</p>
          <BaseButton
            label="Nuevo Documento"
            icon="pi pi-plus"
            variant="success"
            @click="openCreateForm"
            class="mt-3"
          />
        </div>

        <!-- DataTable -->
        <DataTable
          v-if="!documentosStore.loading && documentosStore.documentos.length > 0"
          :value="documentosStore.documentos"
          responsiveLayout="scroll"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} documentos"
          class="p-datatable-sm clickable-table"
          @row-click="onRowClick"
        >
          <Column field="id" header="ID" :sortable="true" style="width: 80px">
            <template #body="slotProps">
              <div class="flex align-items-center">
                <Tag :value="'#' + slotProps.data.id" severity="secondary" class="id-tag" />
              </div>
            </template>
          </Column>

          <Column field="nombre_archivo" header="Nombre del Archivo" :sortable="true">
            <template #body="slotProps">
              <div class="flex align-items-center gap-2">
                <span class="font-semibold">
                  {{ slotProps.data.nombre_archivo || slotProps.data.nombreArchivo }}.{{ slotProps.data.extension }}
                </span>
              </div>
            </template>
          </Column>

          <Column field="extension" header="Extensión" :sortable="true" style="width: 150px">
            <template #body="slotProps">
              <div class="flex justify-content-center">
                <FileIcon :extension="slotProps.data.extension" :size="48" />
              </div>
            </template>
          </Column>

          <Column field="solicitud_id" header="Solicitud" :sortable="true" style="width: 280px">
            <template #body="slotProps">
              <div class="solicitud-info">
                <div class="solicitud-id">
                  #{{ slotProps.data.solicitud?.solicitud_id || slotProps.data.solicitud_id || slotProps.data.solicitudId }}
                </div>
                <div class="solicitud-titulo">
                  {{ slotProps.data.solicitud?.titulo || getSolicitudTitulo(slotProps.data.solicitud_id || slotProps.data.solicitudId) }}
                </div>
              </div>
            </template>
          </Column>

          <Column header="" style="width: 50px">
            <template #body>
              <div class="flex justify-content-center">
                <i
                  class="pi pi-eye text-primary cursor-pointer"
                  v-tooltip="'Ver detalle'"
                  style="font-size: 1.2rem"
                ></i>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <DocumentoDetail
      :visible="showDetail"
      :documento="selectedDocumento"
      @close="closeDetail"
      @edit="editDocumento"
      @delete="confirmDelete"
    />

    <BaseConfirm
      v-model:visible="showDeleteDialog"
      header="Confirmar Eliminación"
      :message="`¿Estás seguro de eliminar el documento <strong>${documentoToDelete?.nombre_archivo || documentoToDelete?.nombreArchivo}.${documentoToDelete?.extension}</strong>?`"
      cancelLabel="Cancelar"
      confirmLabel="Eliminar"
      @confirm="deleteDocumento"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useDocumentosStore } from "@/stores/documentos.store";
import { useSolicitudesStore } from "@/stores/solicitudes.store";
import useForm from "@/composables/useForm";
import { getExtensionColor } from "@/constants/documento.constants";
import DocumentoForm from "./DocumentoForm.vue";
import DocumentoDetail from "./DocumentoDetail.vue";
import BaseButton from "../common/BaseButton.vue";
import FileIcon from "../common/FileIcon.vue";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import BaseConfirm from "../common/BaseConfirm.vue";
import ProgressSpinner from "primevue/progressspinner";

export default {
  components: {
    DocumentoForm,
    DocumentoDetail,
    BaseButton,
    FileIcon,
    Card,
    DataTable,
    Column,
    Tag,
    BaseConfirm,
    ProgressSpinner,
  },
  setup() {
    const toast = useToast();
    const documentosStore = useDocumentosStore();
    const solicitudesStore = useSolicitudesStore();

    // Usar composable genérico para el formulario
    const { showForm, editMode, itemToEdit: documentoToEdit, openCloseForm, openCreateMode: openCreateForm, openEditMode } = useForm();

    const showDetail = ref(false);
    const selectedDocumento = ref(null);
    const showDeleteDialog = ref(false);
    const documentoToDelete = ref(null);

    const viewDocumento = (documento) => {
      selectedDocumento.value = documento;
      showDetail.value = true;
    };

    const closeDetail = () => {
      showDetail.value = false;
      selectedDocumento.value = null;
    };

    const editDocumento = (documento) => {
      openEditMode(documento);
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

    const getExtensionSeverity = getExtensionColor;

    const onRowClick = (event) => {
      viewDocumento(event.data);
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
      getExtensionSeverity,
      onRowClick,
    };
  },
};
</script>

<style scoped>
:deep(.p-datatable) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  transition: all 0.2s ease;
  cursor: pointer;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: var(--p-primary-50);
  font-weight: bold;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

:deep(.p-paginator) {
  border-top: 1px solid var(--p-surface-border);
  background: var(--p-surface-0);
}

/* Header de la lista */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;
}

.list-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--brand-primary);
  margin: 0;
}

.list-title i {
  font-size: 1.5rem;
}

.id-tag {
  font-size: 0.75rem;
  font-weight: 600;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.solicitud-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.solicitud-id {
  font-weight: 600;
  color: var(--brand-primary);
  font-size: 0.9rem;
}

.solicitud-titulo {
  font-size: 0.85rem;
  color: var(--p-text-secondary-color);
}

.clickable-table {
  position: relative;
}

/* Indicador visual de que es clickeable */
:deep(.p-datatable .p-datatable-tbody > tr:hover .pi-eye) {
  transform: scale(1.2);
  color: var(--p-primary-600) !important;
}

.confirmation-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .list-title {
    justify-content: center;
  }

  :deep(.p-button .p-button-label) {
    display: inline;
  }
}
</style>
