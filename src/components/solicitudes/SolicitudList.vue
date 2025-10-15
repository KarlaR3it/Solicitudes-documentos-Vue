<template>
  <div class="max-w-screen-xl mx-auto px-3">
    <Card>
      <template #title>
        <div class="flex align-items-center gap-2">
          <i class="pi pi-list icon-title"></i>
          Lista de Solicitudes
        </div>
      </template>
      <template #content>
        <div v-if="solicitudes.length === 0" class="text-center py-4">
          <i class="pi pi-inbox text-4xl text-400 mb-3 block"></i>
          <p class="text-600 text-lg">No hay ninguna solicitud registrada</p>
          <Button
            :label="'Nueva Solicitud'"
            :icon="'pi pi-plus'"
            :severity="'success'"
            @click="openCloseForm"
            class="btn-primary mt-3"
          />
        </div>

        <div v-else-if="!showForm" class="flex justify-content-end mb-3">
          <Button
            label="Nueva Solicitud"
            icon="pi pi-plus"
            severity="success"
            @click="openCloseForm"
            class="btn-primary"
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
import Tag from "primevue/tag";
//import solicitudApi from '../../api/solicitud';

//solicitudApi.getAll();

export default {
  components: {
    SolicitudDetail,
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

.area-tag {
  font-size: 0.75rem;
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

/* Responsive: oculta texto del botón en móviles */
@media (max-width: 768px) {
  .btn-primary .p-button-label {
    display: none;
  }

  .btn-primary {
    padding: var(--spacing-xs) !important;
    width: auto !important;
  }

  .flex.justify-content-end {
    justify-content: center !important;
  }
}
</style>