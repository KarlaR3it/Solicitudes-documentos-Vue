<template>
  <div class="max-w-screen-xl mx-auto px-3">
    <!-- Header con título y botón -->
    <div class="list-header">
      <h2 class="list-title">
        <i class="pi pi-book"></i>
        Lista de Solicitudes
      </h2>
      <BaseButton
        v-if="solicitudes.length > 0"
        label="Nueva Solicitud"
        icon="pi pi-plus"
        variant="success"
        @click="openCloseForm"
      />
    </div>

    <Card>
      <template #content>
        <div v-if="solicitudes.length === 0" class="text-center py-4">
          <i class="pi pi-inbox text-4xl text-400 mb-3 block"></i>
          <p class="text-600 text-lg">No hay ninguna solicitud registrada</p>
          <BaseButton
            label="Nueva Solicitud"
            icon="pi pi-plus"
            variant="success"
            @click="openCloseForm"
            class="mt-3"
          />
        </div>

        <!-- DataTable itera internamente sobre 'solicitudes' (no se usa v-for explícito) -->
        <DataTable
          v-if="solicitudes.length > 0"
          :value="solicitudes"
          responsiveLayout="scroll"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} solicitudes"
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

          <Column field="titulo" header="Título" :sortable="true">
            <template #body="slotProps">
              <div class="flex align-items-center gap-2">
                <span class="font-semibold">{{ slotProps.data.titulo }}</span>
              </div>
            </template>
          </Column>

          <Column field="area" header="Área" :sortable="true">
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.area"
                severity="info"
                class="area-tag"
              />
            </template>
          </Column>

          <Column field="estado" header="Estado" :sortable="true">
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.estado"
                :severity="getEstadoSeverity(slotProps.data.estado)"
              />
            </template>
          </Column>

          <Column field="createdAt" header="Fecha" :sortable="true">
            <template #body="slotProps">
              <div class="flex align-items-center">
                <i class="pi pi-clock text-400 date-icon"></i>
                <span class="text-sm text-600">{{
                  formatDate(slotProps.data.createdAt)
                }}</span>
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

    <!-- Modal de detalle -->
    <SolicitudDetail
      v-model:visible="showDetailDialog"
      :solicitud="selectedSolicitud"
      @edit="onEditSolicitud"
      @delete="onDeleteSolicitud"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import "moment/locale/es";
import { useToast } from "primevue/usetoast";
import { useSolicitudesStore } from "../../stores/solicitudes.store";
import SolicitudDetail from "./SolicitudDetail.vue";
import BaseButton from "../common/BaseButton.vue";
import Tag from "primevue/tag";
//import solicitudApi from '../../api/solicitud';

//solicitudApi.getAll();

export default {
  components: {
    SolicitudDetail,
    BaseButton,
    Tag,
  },
  props: {
    solicitudes: {
      type: Array,
      default: () => [],
    },
    reloadSolicitudes: Function,
    showForm: Boolean,
    openCloseForm: Function,
  },
  emits: ["edit-solicitud"],
  setup(props, { emit }) {
    const toast = useToast();
    const showDetailDialog = ref(false);
    const selectedSolicitud = ref(null);

    // Store de Pinia
    const solicitudesStore = useSolicitudesStore();

    const formatDate = (date) => {
      return moment(date).fromNow();
    };

    const getEstadoSeverity = (estado) => {
      const severities = {
        Borrador: "secondary",
        Publicado: "info",
        "En Revisión": "warning",
        Aprobado: "success",
        Rechazado: "danger",
        Cerrado: "contrast",
      };
      return severities[estado] || "secondary";
    };

    const onRowClick = (event) => {
      selectedSolicitud.value = event.data;
      showDetailDialog.value = true;
    };

    const onEditSolicitud = (solicitud) => {
      emit("edit-solicitud", solicitud);
    };

    const onDeleteSolicitud = async (solicitudId) => {
      try {
        // Eliminar usando el store de Pinia
        await solicitudesStore.deleteSolicitud(solicitudId);
        showDetailDialog.value = false;

        toast.add({
          severity: "success",
          summary: "¡Eliminada!",
          detail: "La solicitud fue eliminada exitosamente",
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudo eliminar la solicitud",
          life: 3000,
        });
      }
    };

    return {
      formatDate,
      getEstadoSeverity,
      onRowClick,
      onEditSolicitud,
      onDeleteSolicitud,
      showDetailDialog,
      selectedSolicitud,
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

.area-tag {
  font-size: 0.75rem;
}

.id-tag {
  font-size: 0.75rem;
  font-weight: 600;
}

.clickable-table {
  position: relative;
}

/* Separación del icono de fecha */
.date-icon {
  margin-right: 0.75rem;
}

/* Indicador visual de que es clickeable */
:deep(.p-datatable .p-datatable-tbody > tr:hover .pi-eye) {
  transform: scale(1.2);
  color: var(--p-primary-600) !important;
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